import { ReactNode } from "react";
import TOC from "./TOC";
import StoreProvider from "./store/Provider";

export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <StoreProvider>
      <table>
        <tbody>
          <tr>
            <td valign="top" width="100px">
              <TOC />
            </td>
            <td valign="top">{children}</td>
          </tr>
        </tbody>
      </table>
    </StoreProvider>
  );
}