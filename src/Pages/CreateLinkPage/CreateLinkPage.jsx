import styles from './CreatePageLink.module.css'
import { useState } from 'react';

export default function CreateLinkPage() {

    const [form, setForm] = useState({
        source: "",
        medium: "",
        campaing: ""
    })

    const [createdLink, setCreatedLink] = useState()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }))
    };

    const createLink = () => {
        const baseURL = "https://warsawkod.women.place/";
        const params = new URLSearchParams({
            utm_source: form.source.trim(),
            utm_medium: form.medium.trim(),
            utm_campaing: form.campaing.trim(),
        })

        setCreatedLink(`${baseURL}?${params.toString()}`)
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(createdLink)
            alert("Link was copied!")
        } catch (err) {
            alert("Something was wrong!")
        }
    }

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
            name="campaing"
            value={form.campaing}
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
            </>
          )}
        </div>
      </section>
    );
}