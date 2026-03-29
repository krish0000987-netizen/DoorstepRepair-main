import ContentEditor from "./content-editor";

export default function AdminTerms() {
  return (
    <ContentEditor
      section="terms"
      title="Terms & Conditions Page"
      description="Edit the Terms & Conditions, warranty policy, payment info and service charges."
      fields={[
        { key: "title", label: "Page Title", type: "text" },
        { key: "title_highlight", label: "Title Highlight", type: "text" },
        { key: "subtitle", label: "Page Subtitle", type: "textarea" },
        { key: "warranty_charges_title", label: "Warranty Charges Title", type: "text" },
        { key: "warranty_charges_content", label: "Warranty Charges Content", type: "textarea" },
        { key: "warranty_covered_title", label: "Warranty Covered Title", type: "text" },
        { key: "warranty_covered_items", label: "Warranty Covered Items (one per line)", type: "textarea" },
        { key: "not_covered_title", label: "Not Covered Under Warranty Title", type: "text" },
        { key: "not_covered_items", label: "Not Covered Items (one per line)", type: "textarea" },
        { key: "payment_title", label: "Payment Section Title", type: "text" },
        { key: "payment_content", label: "Payment Content", type: "textarea" },
        { key: "faulty_parts_title", label: "Faulty Parts Title", type: "text" },
        { key: "faulty_parts_content", label: "Faulty Parts Content", type: "textarea" },
        { key: "service_charges_title", label: "Service Charges Title", type: "text" },
        { key: "service_charges_content", label: "Service Charges Content", type: "textarea" },
        { key: "general_terms_title", label: "General Terms Title", type: "text" },
        { key: "general_terms_items", label: "General Terms (one per line)", type: "textarea" },
      ]}
    />
  );
}
