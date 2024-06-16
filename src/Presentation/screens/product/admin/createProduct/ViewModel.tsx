import { useContext,useState } from "react";
import { CreateProductUseCase } from "../../../../../Domain/useCases/Product/CreateProduct";
import { UpdateFilesUseCase } from "../../../../../Domain/useCases/File/UpdateFiles";
import * as yup from "yup";
import { showMessage } from "react-native-flash-message";
import * as ImagePicker from "expo-image-picker";
import { Error, ResponseAPIDelivery } from "../../../../../Data/sources/remote/api/models/ResponseApiDelivery";
import { Product } from "../../../../../Domain/entities/Product";
import { useNavigation } from '@react-navigation/native';

interface ProductFormValues {
  id?: string;
  name: string;
  description: string;
  price: string;
  images: [string, string, string],
  is_active: boolean;
  category_id: number;
  loading: boolean;
}

interface ResponseErrorData {
  path: string;
  value: string;
}

const productValidationSchema = yup.object().shape({
  name: yup.string().required("El nombre del producto es requerido"),
  description: yup.string().required("La descripción del producto es requerida").max(150, "La descripción no puede tener más de 150 caracteres"),
  price: yup.string().required("El precio del producto es requerido"),
  images: yup.array().of(yup.string().required("Las imagen son requeridas")),
});

const CreateProductViewModel = (categoryId: number) => {

  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
  const [errorsResponse, setErrorResponses] = useState<ResponseErrorData[]>([]);
  const [files, setFiles] = useState<Array<ImagePicker.ImageInfo | null>>([null, null, null]);


  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const [formValues, setFormValues] = useState<ProductFormValues>({
    id: "",
    name: "",
    description: "",
    price: "", // Change the type from string to number
    is_active: false,
    images: ["", "", ""],
    category_id: categoryId,
    loading: false,
  });

  const onChange = (key: string, value: string) => {
    // Create a new copy of formValues and modify it
      setFormValues({ ...formValues, [key]: value });
    
  }

  const onImageChange = (index: number, value: ImagePicker.ImageInfo) => {
    const images: [string, string, string] = [...formValues.images];
    images[index] = value.uri;
    // Create a new copy of formValues and modify it
      setFormValues({ ...formValues, images });

    const newFiles = [...files];
    newFiles[index] = value;
    setFiles(newFiles);
  }

  const createProduct = async () => {
    setErrorMessages({});
    setFormValues({ ...formValues, loading: true });
    const isValid = await isValidForm();
    if (isValid) {
      // Clear previous error messages
      setErrorMessages({});
      try {
        // Aquí puedes implementar la lógica para crear el producto
        //console.log("se entra al try");
        const createValues = {
          ...formValues,
          price: Number(formValues.price),
        };

        const response = await CreateProductUseCase(createValues as Product);

        if(response.success){
          const responseImage = await UpdateFilesUseCase(files, 'product', response.product_id);
          if(responseImage.success){
            showMessage({
              message: "Producto creado correctamente",
              type: "success",
              icon: "success",
            });
            setFormValues({...formValues, name: "", description: "", price: "", is_active: true, loading: false});
            navigation.goBack();
          }
        } 

      } catch (error) {
          setFormValues({ ...formValues, loading: false });
          const rejectErrors: ResponseAPIDelivery = error;
          console.log("error en createCategory");
          console.log(error);
          console.log(rejectErrors);

          if(error === undefined){
            setFormValues({ ...formValues, loading: false });
            showMessage({
              message: "Error de conexión",
              type: "danger",
              icon: "danger",
            });

          }
          if(rejectErrors.error){
            setErrorResponses([]);
            showMessage({
              message: rejectErrors.error,
              type: "danger",
              icon: "danger",
            });
            setFormValues({ ...formValues, loading: false });
          } else {

            // json to array
            const errorsArray = Object.values(rejectErrors.errors);

            const errorsArrayFilter = errorsArray.map(({ msg, path }) => ({ value: msg, path }))
            setErrorResponses(errorsArrayFilter);
            console.log(errorsArrayFilter);
            setFormValues({ ...formValues, loading: false });

          }
        };

      
    }
  };

  const isValidForm = async (): Promise<boolean> => {
    try {
      await productValidationSchema.validate(formValues, { abortEarly: false });
      return true;
    } catch (error) {
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      setErrorMessages(errors);
      console.log(errorMessages);
      setFormValues({ ...formValues, loading: false });
      return false;
    }
  };

  const pickImage = (imageIndex: number) => async () => {
    try{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1
      });

      if (!result.canceled) {
        onImageChange(imageIndex, result.assets[0]);
      }

    }catch(error){
      console.error(error);
    }
    
  }

  const takePhoto = (imageIndex: number) => async () => {

    try{
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1
      });

      if (!result.canceled) {
        onImageChange(imageIndex, result.assets[0]);
      }

    }catch(error){
      console.error(error);
    }

    

  };

  return {
    ...formValues,
    onChange,
    createProduct,
    errorMessages,
    errorsResponse,    
    pickImage,
    takePhoto,
 
  }

  


}

export default CreateProductViewModel;
