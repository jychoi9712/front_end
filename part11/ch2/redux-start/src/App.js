import "./App.css";
// import TodoList from "./components/TodoList";
// import TodoForm from "./components/TodoForm";
import TodoListContainer from "./containers/TodoListContainer";
import TodoFormContainer from "./containers/TodoFormContainer";
import UserListContainer from "./containers/UserListContainer";

/*// props 전달 방식
function App({ store }) {
    const [state, setState] = useState(store.getState());
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(store.getState());
        });
        return () => {
            unsubscribe();
        };
    }, [store]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {JSON.stringify(state)}
                <button onClick={click}> 추가 </button>
            </header>
        </div>
    );

    function click() {
        store.dispatch(addToDo("todo"));
    }
}
*/

// Context API 방식
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <UserListContainer />
                <TodoListContainer />
                <TodoFormContainer />
            </header>
        </div>
    );
}

export default App;
