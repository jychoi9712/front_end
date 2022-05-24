import { goBack } from "connected-react-router";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Add from "../components/Add";
import { BookReqType, RootState } from "../types";
import { logout as logoutSagaStart } from "../redux/modules/auth";
import { addBook as addBookSagaStart } from "../redux/modules/books";
import { useNavigate } from "react-router-dom";

const AddContainer = () => {
    const navigate = useNavigate();

    const loading = useSelector<RootState, boolean>(
        (state) => state.books.loading
    );

    const dispatch = useDispatch();

    const back = useCallback(() => {
        return navigate("/");
    }, [dispatch]);

    const logout = useCallback(() => {
        dispatch(logoutSagaStart());
    }, [dispatch]);

    const add = useCallback(
        (book: BookReqType) => {
            dispatch(addBookSagaStart(book));
            return navigate("/");
        },
        [dispatch]
    );

    return <Add loading={loading} back={back} logout={logout} add={add} />;
};

export default AddContainer;