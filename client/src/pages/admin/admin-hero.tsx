import ContentEditor from "./content-editor";

export default function AdminHero() {
  return (
    <ContentEditor
      section="hero"
      title="Hero Section"
      description="Edit the main hero section that visitors see first on the homepage."
      fields={[
        { key: "badge", label: "Badge Text", type: "text" },
        { key: "title_line1", label: "Title Line 1", type: "text" },
        { key: "title_line2", label: "Title Line 2", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "text" },
        { key: "highlight", label: "Highlight Text", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "button_primary", label: "Primary Button Text", type: "text" },
        { key: "button_secondary", label: "Secondary Button Text", type: "text" },
        { key: "technician_count", label: "Technician Count Text", type: "text" },
        { key: "rating", label: "Rating Text", type: "text" },
        { key: "hero_image", label: "Hero Image", type: "image" },
      ]}
    />
  );
}
