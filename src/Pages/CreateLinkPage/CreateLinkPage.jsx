import styles from "./CreatePageLink.module.css";
import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function CreateLinkPage() {
  const [form, setForm] = useState({
    source: "",
    medium: "",
    campaign: "",
  });

  const [createdLink, setCreatedLink] = useState("");
  const svgRef = useRef(null); // для доступа к SVG DOM

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const createLink = () => {
    const baseURL = "https://warsawkod.women.place/";
    const params = new URLSearchParams({
      utm_source: form.source.trim(),
      utm_medium: form.medium.trim(),
      utm_campaign: form.campaign.trim(),
    });

    setCreatedLink(`${baseURL}?${params.toString()}`);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(createdLink);
      alert("Link was copied!");
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  const downloadSVG = () => {
    const svg = svgRef.current;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.svg";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <section className={styles.CreateLinkPageSection}>
      <div className={styles.containerCL}>
        <input
          type="text"
          placeholder="Здесь вводим источник откуда пришли"
          name="source"
          value={form.source}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Тип рекламы(инста, или просто ссылка)"
          name="medium"
          value={form.medium}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Сюда вводим имя от кого"
          name="campaign"
          value={form.campaign}
          onChange={handleChange}
          className={styles.input}
        />
        <button className={styles.createLinkBtn} onClick={createLink}>
          Create Link
        </button>

        {createdLink && (
          <>
            <p className={styles.createdLinkHere}>{createdLink}</p>
            <button className={styles.copyLinkBtn} onClick={copyToClipboard}>
              COPY
            </button>

            <div className={styles.qrWrapper}>
              <QRCodeSVG
                value={createdLink}
                size={256}
                level="H"
                includeMargin={true}
                ref={svgRef}
              />
            </div>
            <button className={styles.copyLinkBtn} onClick={downloadSVG}>
              Скачать QR как SVG
            </button>
          </>
        )}
      </div>
    </section>
  );
}
