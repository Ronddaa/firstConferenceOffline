import styles from "./PageThx.module.css";
import logo from "./logo.svg";
import art from "./PageThank.svg";
import sprite from "../components/icons.svg";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";

export default function PageThx() {
  const [searchParams] = useSearchParams();
  const [ticketUrl, setTicketUrl] = useState("");
  const ticketRef = useRef(null);

  const ticketId = searchParams.get("ticketId");
  const tariff = searchParams.get("tariff");

  useEffect(() => {
    if (!ticketId || !tariff) return;

    async function fetchTicketUrl() {
      try {
        const res = await fetch(`/tickets/${ticketId}`);
        await res.json(); // для проверки существования
        const url = `https://warsawkod.women.place/ticket/${tariff}/${ticketId}`;
        setTicketUrl(url);
      } catch (error) {
        console.log("Failed to load ticket URL:", error);
      }
    }
    fetchTicketUrl();
  }, [ticketId, tariff]);

  const handleDownloadTicket = async () => {
    if (!ticketRef.current) return;
    const iframe = ticketRef.current;
    try {
      const iframeDocument =
        iframe.contentDocument || iframe.contentWindow.document;
      const ticketContent = iframeDocument.body;
      const canvas = await html2canvas(ticketContent, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = `ticket-${ticketId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Failed to download ticket:", err);
    }
  };

  return (
    <section className={styles.PageThx}>
      <img className={styles.PageThxIMG} src={art} alt="art" />
      <img
        className={styles.logo}
        src={logo}
        alt="logo"
        width={274}
        height={69}
      />
      <h2 className={styles.titleThank}>Ура, ти з нами!</h2>
      <p className={styles.lizText}>І в нас — мурахи по шкірі!</p>
      <p className={styles.iventDate}>
        <span>23 серпня ми зустрінемось у Варшаві!</span>{" "}
        <br className={styles.brMobile} />
        <br className={styles.brDesc} />
        Там, де можна дихати на повні груди, сміятись до сліз, мовчати{" "}
        <br className={styles.brDesc} />
        по-справжньому і бути собою — поруч із такими ж жінками!
      </p>
      <p className={styles.blueText}>
        Ми дуже чекаємо на тебе! <br className={styles.brDesc} />І вже
        відчуваємо твою присутність!
      </p>
      <h3 className={styles.titleChoise}>
        обери, куди відправити <br className={styles.brDesc} /> твій квиток:
      </h3>
      {ticketUrl && (
        <>
          <ul className={styles.wrapperChoiseButtons}>
            <li>
              <a
                className={styles.choiseBtn}
                href={`https://t.me/share/url?url=${encodeURIComponent(
                  ticketUrl
                )}&text=Ось твій квиток`}
                target="_blank"
                rel="noopener noreferrer"
              >
                на telegram
                <svg className={styles.arrowList} width={24} height={24}>
                  <use xlinkHref={`${sprite}#icon-arrow`}></use>
                </svg>
              </a>
            </li>
            <li>
              <a
                className={styles.choiseBtn}
                href={`mailto:?subject=Твій квиток на конференцію&body=Ось твій квиток: ${ticketUrl}`}
              >
                на пошту
                <svg className={styles.arrowList} width={24} height={24}>
                  <use xlinkHref={`${sprite}#icon-arrow`}></use>
                </svg>
              </a>
            </li>
            <li>
              <button
                className={styles.choiseBtn}
                onClick={handleDownloadTicket}
              >
                завантажити тут
                <svg className={styles.arrowList} width={24} height={24}>
                  <use xlinkHref={`${sprite}#icon-arrow`}></use>
                </svg>
              </button>
            </li>
          </ul>

          {/* Скрытый iframe с билетом */}
          <iframe
            ref={ticketRef}
            src={ticketUrl}
            style={{
              width: "1200px",
              height: "1600px",
              opacity: 0,
              position: "absolute",
              left: "-9999px",
            }}
            sandbox="allow-same-origin allow-scripts"
            title="ticket-preview"
          />
        </>
      )}
      <p className={styles.connectTelegramText}>
        для того, щоб бути в курсі <span>всіх анонсів</span> і бекстейджу{" "}
        <br className={styles.brDesc} />
        підготовки, приєднуйся до нашого telegram-каналу!
      </p>
      <ul className={styles.wrapperConnectTelegramList}>
        <li>
          <a className={styles.telegramLink} href="https://t.me/warsawkod_bot">
            приєднатись
            <svg className={styles.arrowListLink} width={24} height={24}>
              <use xlinkHref={`${sprite}#icon-arrow`}></use>
            </svg>
          </a>
        </li>
        <li>
          <svg className={styles.telegSVG} width={87} height={87}>
            <use xlinkHref={`${sprite}#icon-teleg`}></use>
          </svg>
        </li>
      </ul>
    </section>
  );
}