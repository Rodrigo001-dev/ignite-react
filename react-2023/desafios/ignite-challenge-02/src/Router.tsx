import { Routes, Route } from "react-router-dom";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={DefaultLayout}>
        <Route path="/" element={Home} />
        <Route path="/checkout" element={Checkout} />
        <Route path="/success" element={Success} />
      </Route>
    </Routes>
  );
}
