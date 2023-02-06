import './App.css';
import Header from './components/layouts/header';
import Main from './components/layouts/main';
import Footer from './components/layouts/footer';
import { BrowserRouter,Route } from 'react-router-dom';
import Login from './components/authentication/login';
import Register from './components/authentication/register';
import ContactList from './components/contacts/contactList';
import ContactDetails from './components/contacts/contactDetails';
import Message from './components/messages/message';
import MessageList from './components/messages/messageList';
import ProtectedRoute from './components/route/protectedRoute';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <Route path="/" component={Main} exact></Route>
      <Route path="/login" component={Login} exact></Route>
      <Route path="/register" component={Register} exact></Route>
      <ProtectedRoute path="/contacts" component={ContactList} exact></ProtectedRoute>
      <ProtectedRoute path="/contactDetails" component={ContactDetails} exact></ProtectedRoute>
      <ProtectedRoute path="/sendMessage" component={Message} exact></ProtectedRoute>
      <ProtectedRoute path="/messages" component={MessageList} exact></ProtectedRoute>
      <Footer/> 
    </div>
    </BrowserRouter>
  );
}

export default App;
