"use client";
import ContainerAOS from "@/components/elements/ContainerAOS";
import React, { useState } from "react";

const sectionConfigs = {
  careers: {
    title: "Form Input Karir",
    fields: [
      { name: "name", label: "Nama Perusahaan", type: "text", required: true },
      {
        name: "logo",
        label: "Logo (URL atau upload)",
        type: "file",
        required: true,
      },
      { name: "link", label: "Link", type: "text" },
      { name: "location", label: "Lokasi", type: "text", required: true },
      { name: "date", label: "Tanggal", type: "date", required: true },
      { name: "during", label: "Durasi", type: "text", required: true },
      { name: "profession", label: "Profesi", type: "text", required: true },
    ],
  },
  certificates: {
    title: "Form Input Sertifikat",
    fields: [
      { name: "title", label: "Judul", type: "text", required: true },
      {
        name: "image",
        label: "Gambar Sertifikat (URL atau upload)",
        type: "file",
        required: true,
      },
      {
        name: "description",
        label: "Deskripsi",
        type: "textarea",
        required: true,
      },
      { name: "diberikan", label: "Diberikan", type: "date", required: true },
      {
        name: "berlaku",
        label: "Berlaku Sampai",
        type: "date",
        required: true,
      },
      { name: "id_certificate", label: "ID Sertifikat", type: "text" },
      { name: "issuer", label: "Penerbit", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
    ],
  },
  education: {
    title: "Form Input Pendidikan",
    fields: [
      { name: "title", label: "Judul", type: "text", required: true },
      {
        name: "logo",
        label: "Logo (URL atau upload)",
        type: "file",
        required: true,
      },
      { name: "href", label: "Link", type: "text" },
      { name: "year", label: "Tahun", type: "number", required: true },
      { name: "school", label: "Sekolah", type: "text", required: true },
      { name: "gtw", label: "GTW", type: "text" },
      { name: "jurusan", label: "Jurusan", type: "text", required: true },
    ],
  },
  projects: {
    title: "Form Input Proyek",
    fields: [
      { name: "title", label: "Judul", type: "text", required: true },
      {
        name: "description",
        label: "Deskripsi",
        type: "textarea",
        required: true,
      },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "link_demo", label: "Link Demo", type: "text", required: true },
      {
        name: "link_github",
        label: "Link Github",
        type: "text",
        required: true,
      },
      {
        name: "image",
        label: "Gambar Proyek (URL atau upload)",
        type: "file",
        required: true,
      },
      { name: "is_show", label: "Tampilkan?", type: "checkbox" },
      { name: "is_featured", label: "Featured?", type: "checkbox" },
      { name: "aos_delay", label: "AOS Delay", type: "number" },
      {
        name: "params_slug",
        label: "Params Slug",
        type: "text",
        required: true,
      },
      {
        name: "tech_stack",
        label: "Tech Stack (pisahkan dengan koma)",
        type: "text",
      },
    ],
  },
};

export default function MauNgapain() {
  const [section, setSection] = useState("careers");
  const [data, setData] = useState({});
  const [fileInputs, setFileInputs] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleSectionChange = (e) => {
    setSection(e.target.value);
    setData({});
    setFileInputs({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFileInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const result = await res.json();
    return result.imageUrl || "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let payload = { ...data };

    // Handle file uploads for fields that are files
    for (const field of sectionConfigs[section].fields) {
      if (field.type === "file" && fileInputs[field.name]) {
        const url = await uploadFile(fileInputs[field.name]);
        // Map to correct field name for API
        if (section === "careers" && field.name === "logo") payload.logo = url;
        if (section === "certificates" && field.name === "image")
          payload.image = url;
        if (section === "education" && field.name === "logo")
          payload.logo = url;
        if (section === "projects" && field.name === "image")
          payload.image = url;
      }
    }

    // Special mapping for projects
    if (section === "projects") {
      payload.params = { slug: payload.params_slug };
      delete payload.params_slug;
      if (payload.tech_stack) {
        payload.tech_stack = payload.tech_stack
          .split(",")
          .map((t) => ({ title: t.trim() }))
          .filter((t) => t.title);
      }
    }

    await fetch(`/api/${section}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setData({});
    setFileInputs({});
    setUploading(false);
  };

  const config = sectionConfigs[section];

  return (
    <ContainerAOS>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pilih Section
            </label>
            <select
              value={section}
              onChange={handleSectionChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {Object.keys(sectionConfigs).map((key) => (
                <option key={key} value={key}>
                  {sectionConfigs[key].title.replace("Form Input ", "")}
                </option>
              ))}
            </select>
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {config.title}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {config.fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={data[field.name] || ""}
                    onChange={handleChange}
                    rows="3"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required={field.required}
                  />
                ) : field.type === "file" ? (
                  <input
                    type="file"
                    id={field.name}
                    name={field.name}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500"
                    required={field.required}
                  />
                ) : field.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    id={field.name}
                    name={field.name}
                    checked={!!data[field.name]}
                    onChange={handleChange}
                    className="mt-1"
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={data[field.name] || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required={field.required}
                  />
                )}
              </div>
            ))}
            <div>
              <button
                id="submitBtn"
                type="submit"
                disabled={uploading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {uploading ? "Mengirim..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ContainerAOS>
  );
}
