import React from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";

function ToDoInput({ onAdd }) {

  const formik = useFormik({
    initialValues: {
      item: ''
    },
    validationSchema: Yup.object({
      item: Yup.string().trim().required("Isi tidak boleh kosong").min(3, "Jumlah Karakter Minimal 3"),
    }),
    onSubmit: (values, {resetForm}) => {
      onAdd(values.item);
      resetForm();
    }
  })

  return (
    <>
      <div className="max-w-xl mx-auto px-4 py-6 bg-gray-400 rounded-xl flex flex-col items-center">
        <p className="text-2xl font-bold mb-4 text-center">Masukkan List</p>
        <form onSubmit={formik.handleSubmit}>
          <input
            name="item"
            type="text"
            placeholder="Input List"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.item}
            className="border rounded mr-4 w-sm bg-white p-2"
          />

          <button type="submit" className="bg-white p-2 rounded-lg border duration-300 ease-in-out hover:bg-black hover:text-white">
            Tambah
          </button>
          {
            formik.touched.item && formik.errors.item ? (
              <>
                <div className="bg-white p-1 mt-2 pl-4 rounded-lg">
                  <p className="text-red-500 text-sm">{formik.errors.item}</p>
                </div>
              </>
            ) : null
          }
        </form>
      </div>
    </>
  );
}

export default ToDoInput;
