import ContentEditor from "./content-editor";

export default function AdminFooter() {
  return (
    <ContentEditor
      section="footer"
      title="Footer"
      description="Edit the website footer content, social links, and copyright text."
      fields={[
        { key: "company_name", label: "Company Name", type: "text" },
        { key: "company_description", label: "Company Description", type: "textarea" },
        { key: "phone", label: "Phone Number", type: "text" },
        { key: "email", label: "Email", type: "text" },
        { key: "instagram", label: "Instagram URL", type: "text" },
        { key: "facebook", label: "Facebook URL", type: "text" },
        { key: "copyright", label: "Copyright Text", type: "text" },
      ]}
    />
  );
}
