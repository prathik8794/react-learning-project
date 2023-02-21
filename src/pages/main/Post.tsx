import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../config/firebase';
import { Post as iPost } from './main'
interface Props {
    post: iPost
}
interface Like {
    likeId: string;
    userId: string;
}
export const Post = (props: Props) => {
    const { post } = props;
    const [user] = useAuthState(auth);
    const [Likes, setLikes] = useState<Like[] | null>(null);
    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id));
    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
    }
    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id,
            });
            if (user) {
                setLikes((prev) => prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }]);
            }
        } catch (e) {
            console.log(e);
        }
    }
    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(likesRef, where("userId", "==", user?.uid), where("postId", "==", post.id));
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);
            await deleteDoc(likeToDelete);
            if (user) {
                setLikes((prev) => prev && prev.filter((like) => like.userId !== user.uid));
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getLikes();
    }, []);
    const hasUserLiked = Likes?.some((like) => like.userId === user?.uid);
    return (
        <div>
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <p>@{post.username}</p>
                <button onClick={!hasUserLiked ? addLike : removeLike}>{!hasUserLiked ? <>&#128077;</> : <>&#128078;</>}</button>
                {Likes && <p>{Likes?.length}</p>}
            </div>
        </div>
    )
}