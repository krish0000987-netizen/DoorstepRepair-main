import ContentEditor from "./content-editor";

export default function AdminPrivacy() {
  return (
    <ContentEditor
      section="privacy"
      title="Privacy Policy Page"
      description="Edit the Privacy Policy page content and sections."
      fields={[
        { key: "title", label: "Page Title", type: "text" },
        { key: "title_highlight", label: "Title Highlight", type: "text" },
        { key: "subtitle", label: "Page Subtitle", type: "textarea" },
        { key: "section_1_title", label: "Section 1 Title", type: "text" },
        { key: "section_1_content", label: "Section 1 Content", type: "textarea" },
        { key: "section_1_items", label: "Section 1 Items (one per line)", type: "textarea" },
        { key: "section_2_title", label: "Section 2 Title", type: "text" },
        { key: "section_2_content", label: "Section 2 Content", type: "textarea" },
        { key: "section_2_items", label: "Section 2 Items (one per line)", type: "textarea" },
        { key: "section_3_title", label: "Section 3 Title", type: "text" },
        { key: "section_3_content", label: "Section 3 Content", type: "textarea" },
        { key: "section_4_title", label: "Section 4 Title", type: "text" },
        { key: "section_4_content", label: "Section 4 Content", type: "textarea" },
        { key: "section_4_items", label: "Section 4 Items (one per line)", type: "textarea" },
        { key: "section_5_title", label: "Contact Section Title", type: "text" },
        { key: "section_5_content", label: "Contact Section Content", type: "textarea" },
        { key: "contact_email", label: "Contact Email", type: "text" },
        { key: "contact_phone", label: "Contact Phone", type: "text" },
        { key: "contact_address", label: "Contact Address", type: "text" },
      ]}
    />
  );
}
