import ContentEditor from "./content-editor";

export default function AdminAbout() {
  return (
    <ContentEditor
      section="about"
      title="About Page"
      description="Edit the About page content including stats, mission and values."
      fields={[
        { key: "title", label: "Page Title", type: "text" },
        { key: "title_highlight", label: "Title Highlight", type: "text" },
        { key: "description", label: "Page Description", type: "textarea" },
        { key: "stat_1_value", label: "Stat 1 Value", type: "text" },
        { key: "stat_1_label", label: "Stat 1 Label", type: "text" },
        { key: "stat_2_value", label: "Stat 2 Value", type: "text" },
        { key: "stat_2_label", label: "Stat 2 Label", type: "text" },
        { key: "stat_3_value", label: "Stat 3 Value", type: "text" },
        { key: "stat_3_label", label: "Stat 3 Label", type: "text" },
        { key: "stat_4_value", label: "Stat 4 Value", type: "text" },
        { key: "stat_4_label", label: "Stat 4 Label", type: "text" },
        { key: "mission_title", label: "Mission Title", type: "text" },
        { key: "mission_description", label: "Mission Description", type: "textarea" },
        { key: "value_1_title", label: "Value 1 Title", type: "text" },
        { key: "value_1_description", label: "Value 1 Description", type: "textarea" },
        { key: "value_2_title", label: "Value 2 Title", type: "text" },
        { key: "value_2_description", label: "Value 2 Description", type: "textarea" },
        { key: "value_3_title", label: "Value 3 Title", type: "text" },
        { key: "value_3_description", label: "Value 3 Description", type: "textarea" },
      ]}
    />
  );
}
