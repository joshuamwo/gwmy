const text: Record<Text, string> = {
  publish_toggle_label: "Make available on Marketplace",
  producers_input_placeholder: "Enter Producer's Name & Press Enter To Add",
  producers_input_label: "Producers",
};

export function t(key: Text) {
  return text[key];
}

type Text =
  | "publish_toggle_label"
  | "producers_input_placeholder"
  | "producers_input_label";
