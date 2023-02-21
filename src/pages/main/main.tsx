import { getDocs,collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Post } from "./Post";

export interface Post {
    id : string;
    userId : string;
    title : string;
    username : string;
    description : string;
}
export const Main = () => {
    const [postList, setPostList] = useState<Post[] | null>(null);
    const postRef = collection(db, "posts");
    const getPosts = async () => {
        const data = await getDocs(postRef);
        setPostList(
            data.docs.map((doc) => ({...doc.data(),id:doc.id})) as Post[]
            );
    }
    useEffect (()=> {
        getPosts();
    },[]);
    return (
        <div>
        <h1>Home Page</h1>
        <div>
            {postList?.map((post) =>(
                <Post post={post}/>
            ))}
        </div>
        </div>
    );
};