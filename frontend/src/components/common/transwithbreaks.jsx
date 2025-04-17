import { Trans } from "react-i18next";

export default function TransWithBreaks({ i18nKey }) {
  return <Trans i18nKey={i18nKey} components={{ 1: <br /> }} />;
}
