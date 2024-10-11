// src/components/LeadCaptureForm.tsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/customInput";

interface Lead {
  name: string;
  email: string;
  phone: string;
}

const LeadCaptureForm: React.FC = () => {
  const submitLead = async (values: Lead) => {
    try {
      const response = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados");
      }

      const data = await response.json();
      console.log("Lead enviado com sucesso:", data);
    } catch (error) {
      console.error("Erro ao capturar lead:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nome é obrigatório"),
      email: Yup.string()
        .email("Email inválido")
        .required("Email é obrigatório"),
      phone: Yup.string().required("Telefone é obrigatório"),
    }),
    onSubmit: (values) => {
      submitLead(values);
    },
  });

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <CustomInput
          name="name"
          placeholder="Nome"
          value={formik.values.name}
          error={formik.errors.name}
          onChange={formik.handleChange}
        />
        <CustomInput
          name="email"
          type="email"
          placeholder="Email"
          value={formik.values.email}
          error={formik.errors.email}
          onChange={formik.handleChange}
        />
        <CustomInput
          name="phone"
          placeholder="Telefone"
          value={formik.values.phone}
          error={formik.errors.phone}
          onChange={(value) => formik.setFieldValue("phone", value)}
          isPhoneInput
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default LeadCaptureForm;
