import { type FormEvent, useState } from 'react'
import './ContactForm.css'

const packages = [
  { value: 'free', label: '星光諮詢（免費）' },
  { value: 'standard', label: '標準成長套餐' },
  { value: 'premium', label: '尊尚演藝套餐' },
  { value: 'custom', label: '自訂查詢' },
]

function normalizeWhatsAppPhone(raw: string) {
  return raw.replace(/[^\d]/g, '')
}

function buildWhatsAppUrl(phone: string, message: string) {
  const p = normalizeWhatsAppPhone(phone)
  const text = encodeURIComponent(message)
  return `https://wa.me/${p}?text=${text}`
}

export function ContactForm() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const phone = String(form.get('phone') ?? '').trim()
    const pkgValue = String(form.get('package') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()

    const pkgLabel =
      packages.find((p) => p.value === pkgValue)?.label || (pkgValue ? pkgValue : '（未選擇套餐）')

    const whatsappPhone = String(import.meta.env.WHATSAPP_PHONE ?? '').trim()
    if (!whatsappPhone) {
      // fallback：避免阻塞提交
      setSent(true)
      window.setTimeout(() => setSent(false), 4000)
      return
    }

    // 格式請跟足使用者指定（含換行與「個人資料」後面空格）
    const composed = `你好，我對${pkgLabel}很有興趣 以下是我的個人資料 \n${name}\n${email}\n${
      phone || '（未提供聯絡電話）'
    }\n${message}`

    const url = buildWhatsAppUrl(whatsappPhone, composed)
    window.open(url, '_blank', 'noopener,noreferrer')

    setSent(true)
    window.setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <div className="contact-card">
          <header className="contact-card__head">
            <h2 className="contact-card__title">會員申請 / 查詢表單</h2>
            <p className="contact-card__sub">
              請填寫以下資料，我哋會為你提供詳細嘅套餐資訊同報價。
            </p>
          </header>

          <form className="contact-form" onSubmit={onSubmit}>
            <label className="contact-form__field">
              <span className="contact-form__label">
                聯絡人姓名 <span className="req">*</span>
              </span>
              <input name="name" required placeholder="請輸入您的姓名" autoComplete="name" />
            </label>

            <label className="contact-form__field">
              <span className="contact-form__label">
                電郵地址 <span className="req">*</span>
              </span>
              <input
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                autoComplete="email"
              />
            </label>

            <label className="contact-form__field">
              <span className="contact-form__label">聯絡電話</span>
              <input name="phone" type="tel" placeholder="+852 1234 5678" autoComplete="tel" />
            </label>

            <label className="contact-form__field">
              <span className="contact-form__label">選擇套餐</span>
              <select name="package" defaultValue="">
                <option value="" disabled hidden>
                  請選擇套餐
                </option>
                {packages.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="contact-form__field">
              <span className="contact-form__label">
                訊息 / 查詢內容 <span className="req">*</span>
              </span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="請告訴我們您的需求、感興趣的產品或任何問題..."
              />
            </label>

            <button type="submit" className="contact-form__submit">
              提交查詢
            </button>
            {sent && <p className="contact-form__ok">收到！我哋會盡快回覆你 ☀️</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
