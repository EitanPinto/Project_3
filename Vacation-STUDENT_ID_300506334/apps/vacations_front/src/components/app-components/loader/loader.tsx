import { CSSProperties, ReactElement } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#fccb90",
  backgroundColor: "#fccb90",
  backgroundImage: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"
};
export function Loader(props: {
  isLoading: boolean;
  children: ReactElement;
}) {
  return props.isLoading ? (
    <ClipLoader 
    loading={props.isLoading} 
    size={75}
    cssOverride={override} > 
    </ClipLoader>
  ) : (
    props.children
  );
}
