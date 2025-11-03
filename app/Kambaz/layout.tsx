'use client'
import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import { Container } from "react-bootstrap";
import store from "./store";
import { Provider } from "react-redux";
import "./styles.css";
export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          {children}
        </div>
      </div>
    </Provider>
  );
}
