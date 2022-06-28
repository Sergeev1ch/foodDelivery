import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Cart from './pages/Cart';
import Shop from './pages/Shop';

const App = observer(() => (
  <BrowserRouter>
    <Routes>
      <Route key="/" path="/" element={<Shop />} exact />
      <Route key="/cart" path="/cart" element={<Cart />} exact />
      <Route key="*" path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
));

export default App;
