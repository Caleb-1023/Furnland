import { FastField, ErrorMessage, useFormikContext } from "formik";
import { useState } from "react";
import { inputProps } from "./Types";
import { fileProps } from "./Types";

export const Input = ({ name, label, type, required }: inputProps) => {
  const [hide, sethide] = useState(type);
  return (
    <div>
      <div className="mb-3">
        <div className="d-flex justify-content-between">
          {required  ? (
            <label className="form-label" htmlFor={name}>
              {label}
              <span className="text-danger ps-2">*</span>
            </label>
          ) : (
            <label className="form-label" htmlFor={name}>
              {label}
              <span className="text-sm text-muted">(optional)</span>
            </label>
          )}

          {name === "password" ? (
            <span className="ms-5">
              <button type="button" onClick={() => sethide("text")}>
                Hey
              </button>
            </span>
          ) : null}
        </div>
        <FastField className="form-control" name={name} type={hide} id={name} />
        <ErrorMessage name={name} component="div" className="text-danger" />
      </div>
    </div>
  );
};
export const Textarea = ({ name, label, type, required }: inputProps) => {
  return (
    <div>
      <div className="mb-3">
        <div className="justify-content-between">
          {required  ? (
            <label className="form-label" htmlFor={name}>
              {label}
              <span className="text-danger ps-2">*</span>
            </label>
          ) : (
            <label className="form-label" htmlFor={name}>
              {label}
              <span className="text-sm text-muted">(optional)</span>
            </label>
          )}
          <FastField  
                          className="form-control" name={name} as={type} id={name} />
          <ErrorMessage name={name} component="div" className="text-danger" />
        </div>
      </div>
    </div>
  );
};

export const File=({ name, label, type, required }: inputProps)=>{

    const formik= useFormikContext()
    
    return(
        <div>
      <div className="mb-3">
        <div className="justify-content-between">
          {required  ? (
            <label className="form-label" htmlFor={name}>
              {label}
              <span className="text-danger ps-2">*</span>
            </label>
          ) : (
            <label className="form-label" htmlFor={name}>
              {label}
              <span className="text-sm text-muted">(optional)</span>
            </label>
          )}
          <FastField onChange={(e : React.FormEvent<HTMLInputElement>)=>{
            const targett = e.target as HTMLInputElement
            formik.setFieldValue(name, targett.files?.[0])
            
          }} className="form-control" name={name} id={name} type={type}   />
          <ErrorMessage name={name} component="div" className="text-danger" />
        </div>
      </div>
    </div>
    )
}