import ContentEditor from "./content-editor";

export default function AdminContact() {
  return (
    <ContentEditor
      section="contact"
      title="Contact Page"
      description="Edit contact information displayed on the Contact page."
      fields={[
        { key: "title", label: "Page Title", type: "text" },
        { key: "title_highlight", label: "Title Highlight", type: "text" },
        { key: "description", label: "Page Description", type: "textarea" },
        { key: "phone", label: "Phone Number", type: "text" },
        { key: "email", label: "Email Address", type: "text" },
        { key: "whatsapp", label: "WhatsApp Number", type: "text" },
        { key: "address", label: "Address", type: "text" },
        { key: "hours_weekday", label: "Weekday Hours", type: "text" },
        { key: "hours_weekend", label: "Weekend Hours", type: "text" },
      ]}
    />
  );
}
