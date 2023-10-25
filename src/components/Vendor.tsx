import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Input, Textarea, File } from "./Fields";
import { Formik,FastField,ErrorMessage ,Form  } from "formik";
import { User, vendorProps } from "./Types";
import { productProps } from "./Types";

import Spinner from "react-bootstrap/Spinner";
import * as Yup from "yup";

import { API } from "../controller/api";

type vendorType = {
  itemName: string;
  itemType: string;
  itemCategory: string;
  itemPrice: string;
  itemDescription: string;
  imageUrl: string;
  deliveryEstimation: string;
};

type stepOneProps = {
  next: (newdata: vendorType, final?: boolean) => Promise<void>;
  dataa: vendorType;
  show: {
    setshow: React.Dispatch<React.SetStateAction<boolean>>;
    setadd: React.Dispatch<React.SetStateAction<boolean>>;
    setinitial: React.Dispatch<React.SetStateAction<vendorType>>;
  };
};

type stepTwoProps = {
  next: (newdata: vendorType, final?: boolean) => Promise<void>;
  dataa: vendorType;
  prev: (newdata: vendorType) => void;
};

export const Vendor = () => {
  const [add, setadd] = useState(false);
  const [show, setshow] = useState(true);
  const [data, setdata] = useState<User | null>(null);
  const [vendoritems, setvendoritems] = useState<productProps[] | null>(null);

  const [initial, setinitial] = useState<vendorType>({
    itemName: "",
    itemType: "",
    itemCategory: "",
    itemPrice: "",
    itemDescription: "",
    imageUrl: "",
    deliveryEstimation: "",
  } as vendorType);

  const [stepCount, setStepCount] = useState(0);

  const handleNext = async (newdata: vendorType, final = false) => {
    setinitial((prev) => ({ ...prev, ...newdata }));
    if (final === true) {
      try{
              const response = await API.post(
                "/item/itemCreation",
                initial,
              );
              //navigate("/")
              console.log(response);
      
          }catch(err){
            console.log(err);
      console.log(initial);
          }}
     else {
      setStepCount((prev) => prev + 1);
    }
  };

  const handlePrev = (newdata: vendorType) => {
    setinitial((prev) => ({ ...prev, ...newdata }));
    setStepCount((prev) => prev - 1);
  };
  // const handleCancel=()=>{
  //   setinitial({itemName: "",
  //   itemType: "",
  //   itemCategory: "",
  //   itemPrice: "",
  //   itemDescription: "",
  //   imageUrl: "",
  //   deliveryEstimation: ""})
  // }
  const steps = [
    <Stepone
      next={handleNext}
      show={{ setadd, setshow, setinitial }}
      dataa={initial}
    />,
    <Steptwo next={handleNext} dataa={initial} prev={handlePrev} />,
  ];

  const validate = Yup.object({});

  const getVendorItems = async () => {
    try {
      const response = await API.get(`/item/vendor/${data?.id}`);
      console.log(response);
      setvendoritems(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  // const submit=async(values:vendorProps)=>{
  //   try{
  //       const response = await API.post(
  //         "/item/itemCreation",
  //         {
  //     itemName: values.itemName,
  //   itemType: values.itemType,
  //   itemCategory: values.itemCategory,
  //   itemPrice: values.itemPrice,
  //   itemDescription: values.itemDescription,
  //   imageUrl: values.imageUrl,
  //   deliveryEstimation: values.deliveryEstimation
  //         },
  //       );
  //       //navigate("/")
  //       console.log(response);

  //   }catch(err){
  //     console.log(err);

  //   }
  // }
  useEffect(() => {
    const dataa = window.localStorage.getItem("Data");
    if (dataa) {
      setdata(JSON.parse(dataa));
    }
  }, []);
  useEffect(() => {
    if (data) {
      getVendorItems();
    }
  }, [data]);
  return (
    <>
      {show ? (
        <>
          <div className="text-end p-2">
            <button
              onClick={() => {
                setshow(false);
                setadd(true);
              }}
              style={{ backgroundColor: "#F66B0E" }}
              className="btn text-white"
            >
              Add New Item
            </button>
          </div>
          {vendoritems ? (
            <>
              {vendoritems.length > 0 ? (
                <>
                  <Row className="p-3">
                    {vendoritems.map((element) => (
                      <>
                      <Col
                        key={element.id}
                        lg={12}
                        className="mb-3 rounded border d-flex"
                      >
                        <div className="w-25">
                          <img alt="mehn" className="image-fluid" src={element.imageUrl}/>
                        </div>
                        <div className="p-2 d-flex flex-column pb-3  w-75">
                          <span className="mb-1">{element.itemName}</span>
                          <span className="mb-3 text-muted">
                            {element.itemDescription}
                          </span>
                        </div>
                      </Col>
                      </>
                    ))}
                  </Row>
                </>
              ) : (
                <p>You dont have any item</p>
              )}
            </>
          ) : (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          )}
        </>
      ) : null}
      {add ? (
        <>
          {/* {stepCount === 0 && <div className="p-2">
            <button
              className="btn btn-light"
              onClick={() => {
                setshow(true);
                setadd(false);
              }}
            >
              Go back
            </button>
          </div> } */}
          {steps[stepCount]}
        </>
      ) : null}
    </>
  );
};

const Stepone = ({ next, dataa, show }: stepOneProps) => {
  return (
    <>
      <Formik
        initialValues={dataa}
        // validationSchema={validate}
        onSubmit={(value, props) => {
          next(value);
        }}
      >
        {(formikprops) => {
          return (
            <Form>
              <Row className="p-2 pt-4">
                {/* <Col lg={12} className="">
                      <Row className="justify-content-center">
                        <Col lg={6}>
                          <div className="">
                            <Input
                              name="imageUrl"
                              type="file"
                              label="Image"
                            />
                          </div>
                        </Col>
                      </Row>
                    </Col> */}
                <Col lg={6}>
                  <Input name="itemName" type="text" label="Item Name" required/>
                </Col>
                <Col lg={6}>
                  <Input name="itemType" type="text" label="Item Type" required/>
                </Col>
                <Col lg={6}>
                  <Input
                    name="itemCategory"
                    type="text"
                    label="Item Category"
                    required
                  />
                </Col>
                <Col lg={6}>
                  <Input name="itemPrice" type="text" label="Item Price" required />
                </Col>
                <Col lg={12} className="">
                  <Row className="justify-content-center">
                    <Col lg={6}>
                      <div className="">
                        <Input
                          name="deliveryEstimation"
                          type="text"
                          label="Delivery Estimation"
                          required= {true}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col lg={12}>
                  <Textarea
                    name="itemDescription"
                    label="Item Description"
                    type="textarea"
                  />
                </Col>
                <Col>
                  <div className="text-end p-2">
                    <button
                      type="button"
                      onClick={() => {
                        show.setshow(true);
                        show.setadd(false);
                        show.setinitial({
                          itemName: "",
                          itemType: "",
                          itemCategory: "",
                          itemPrice: "",
                          itemDescription: "",
                          imageUrl: "",
                          deliveryEstimation: "",
                        });
                      }}
                      className="btn me-2 btn-light"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Next
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

const Steptwo = ({ next, dataa, prev }: stepTwoProps) => {
 
  
  return (
    <>
      <Formik
        initialValues={dataa}
        // validationSchema={{}}
        onSubmit={async (value, props) => {
          await next(value, true);
          props.resetForm();
        }}
      >
        {(formikprops) => {
          return (
            <Form>
              <Row className="p-2 pt-5">
                <Col lg={12} className="">
                  <Row className="justify-content-center">
                    <Col lg={6}>
                      <div className="">
                          <div>
      <div className="mb-3">
        <div className="justify-content-between">
          
            <label className="form-label" htmlFor="imageUrl">
              Image
              <span className="text-sm text-muted">(optional)</span>
            </label>
        
          <input onChange={(e : React.FormEvent<HTMLInputElement>)=>{
            const targett = e.target as HTMLInputElement
            formikprops.setFieldValue("imageUrl", e.currentTarget.files?[0]: null)
            console.log(e)
            
          }} className="form-control" name="imageUrl" id="imageUrl" value={dataa.imageUrl} type="file"   />
          <ErrorMessage name="imageUrl" component="div" className="text-danger" />
        </div>
      </div>
    </div>
                        {/* <File name="imageUrl" type="file" label="Image" /> */}
                      </div>
                    </Col>
                  </Row>
                  <div className="pt-5 text-end d-flex justify-content-around">
                    <button
                      onClick={() => {
                        prev(formikprops.values);
                      }}
                      type="button"
                      className="btn btn-light"
                    >
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
