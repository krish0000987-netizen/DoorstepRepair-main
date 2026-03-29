import ContentEditor from "./content-editor";

export default function AdminCTA() {
  return (
    <ContentEditor
      section="cta"
      title="CTA Section"
      description="Edit the Call-to-Action section with phone number and WhatsApp link."
      fields={[
        { key: "title", label: "Title", type: "text" },
        { key: "title_highlight", label: "Title Highlight (colored text)", type: "text" },
        { key: "phone", label: "Phone Number (for link)", type: "text" },
        { key: "phone_display", label: "Phone Display Format", type: "text" },
        { key: "tagline", label: "Tagline", type: "text" },
        { key: "whatsapp_number", label: "WhatsApp Number (with country code)", type: "text" },
        { key: "feature_1", label: "Feature 1", type: "text" },
        { key: "feature_2", label: "Feature 2", type: "text" },
        { key: "feature_3", label: "Feature 3", type: "text" },
      ]}
    />
  );
}
