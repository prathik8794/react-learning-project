import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { addDoc,collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

//interface for form data
interface CreateFormData{
    title : string;
    description : string;
}

export const CreateForm = () => {

    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    //schema for validation
    const schema = yup.object().shape({
        title : yup.string().required("Title is required"),
        //if someone enters without title it will show error as Title is required
        description : yup.string().required("Description is required"),
    });

    //registering the form
    const {register,
           handleSubmit,
           formState:{errors},
    } = useForm<CreateFormData>({
        resolver : yupResolver(schema),
    });

    //which db collection to use for storing data
    const postRef = collection(db, 'posts');

    //onSubmit function
    const onCreatePost = async (data : CreateFormData) => {
       await addDoc(
        postRef,{
            ...data,
            username : user?.displayName,
            userId : user?.uid,
        }
       );
         navigate('/');
    }
    return (
        <form onSubmit={handleSubmit(onCreatePost)}>
                <input placeholder='Text...' {...register("title")}/>
                {/* if there is error it will show error message */}
                <p style={{color:"red"}}>{errors.title?.message}</p>
                <textarea placeholder='Description...'{...register("description")}/>
                {/* if there is error it will show error message */}
                <p style={{color:"red"}}>{errors.description?.message}</p>
                <input type="submit" className='submitForm'/>
        </form>
    )
}