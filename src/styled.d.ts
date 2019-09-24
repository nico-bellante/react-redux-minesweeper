import { CSSProp } from "styled-components";

// declare module "styled-components" {
//   export interface DefaultTheme {
//     // Your theme stuff here
//   }
// }

declare module "react" {
  interface Attributes {
    css?: CSSProp;
  }
}
