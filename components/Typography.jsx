import styled from "styled-components";
import { fonts } from "../src/assets/themes";

const Text = styled.span`
  color: ${(props) => props.$color};
  ${fonts}
  white-space: ${(props) => props.$whiteSpace || "pre-line"};
  text-align: ${(props) => props.$textAlign || "left"};
`;

/**
 * @typedef {"heading" | "h1" | "h2" | "h3" | "h4" | "h5" | "large" | "medium" | "regular" |
 * "small" | "tiny" | "mini" } TypographyVariant
 * @typedef {"black" | "bold" | "italic"} FontWeight
 * @typedef {"normal" | "italic"} FontStyle
 *
 */

/**
 * Typography component
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to render inside the component.
 * @param {TypographyVariant} props.variant - The variant of the text (e.g., "h1", "h2").
 * @param {string} [props.color] - The text color.
 * @param {FontWeight} [props.fontWeight] - Font modification (e.g. "bold", "italic").
 * @param {string} [props.className] - Additional class names.
 * @param {FontStyle} [props.fontStyle] - Font style (e.g., "normal", "italic").
 * @param {string} [props.textAlign] - Text alignment (e.g., "left", "center", "right").
 */

export const Typography = ({
  children,
  variant,
  color = "currentColor",
  className = "",
  fontWeight = "",
  fontStyle = "normal",
  whiteSpace = "pre-line",
  textAlign = "left",
}) => {
  return (
    <Text
      className={`${variant} ${fontWeight} ${fontStyle} ${className}`.trim()}
      $color={color}
      $whiteSpace={whiteSpace}
      $textAlign={textAlign}
    >
      {children}
    </Text>
  );
};
