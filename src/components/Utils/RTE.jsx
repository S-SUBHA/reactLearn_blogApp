/* eslint-disable react/prop-types */
// import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({
  name,
  control,
  label,
  defaultvalue = "",
  className = "",
}) {
  return (
    <div>
      {label && <label htmlFor="">{label}</label>}
      <Controller
        name={name || "contenct"}
        control={control}
        render={({ field: { onChange } }) => (
          <textarea
            defaultValue={defaultvalue}
            onChange={onChange}
            className={`${className}`}
          />
          // <input type="text" defaultValue={defaultvalue} onChange={onChange} />
          // <Editor
          //   initialValue={defaultvalue}
          //   init={{
          //     branding: false,
          //     height: 500,
          //     menubar: true,
          //     plugins: [
          //       "advlist",
          //       "autolink",
          //       "lists",
          //       "link",
          //       "image",
          //       "charmap",
          //       "preview",
          //       "anchor",
          //       "searchreplace",
          //       "visualblocks",
          //       "code",
          //       "fullscreen",
          //       "insertdatetime",
          //       "media",
          //       "table",
          //       "code",
          //       "help",
          //       "wordcount",
          //     ],
          //     toolbar:
          //       "undo redo | blocks | " +
          //       "bold italic forecolor | alignleft aligncenter " +
          //       "alignright alignjustify | bullist numlist outdent indent | " +
          //       "removeformat | help",
          //     content_style:
          //       "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          //   }}
          //   onEditorChange={onChange}
          // />
        )}
      />
    </div>
  );
}
