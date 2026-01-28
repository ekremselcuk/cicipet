# CiciPet - Next.js PWA Projesi

Bu proje, CiciPet statik HTML sitesinin Next.js, Tailwind CSS ve Supabase kullanılarak modern bir Progressive Web App (PWA) yapısına dönüştürülmüş halidir.

## 🚀 Kurulum Talimatları

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin.

### 1. Gereksinimler
- Node.js (v18 veya üzeri önerilir)
- Bir Supabase hesabı (Ücretsiz oluşturulabilir)

### 2. Bağımlılıkları Yükleme
Terminali proje klasöründe açın ve aşağıdaki komutu çalıştırın:

```bash
npm install
```

### 3. Supabase Kurulumu
1. [supabase.com](https://supabase.com) adresine gidin ve yeni bir proje oluşturun.
2. Proje ayarlarından (Project Settings) -> **API** sekmesine gidin.
3. `Project URL` ve `anon` public key değerlerini kopyalayın.

### 4. Çevre Değişkenlerini Ayarlama (.env.local)
Proje ana dizininde `.env.local` adında yeni bir dosya oluşturun ve kopyaladığınız değerleri aşağıdaki gibi yapıştırın:

```env
NEXT_PUBLIC_SUPABASE_URL=SİZİN_SUPABASE_URL_ADRESİNİZ
NEXT_PUBLIC_SUPABASE_ANON_KEY=SİZİN_SUPABASE_ANON_KEY_DEĞERİNİZ
```

### 5. Google Giriş (Auth) Ayarları
1. Supabase panelinde **Authentication** -> **Providers** sekmesine gidin.
2. **Google** sağlayıcısını etkinleştirin.
3. Bunu yapılandırmak için bir Google Cloud Console projesi oluşturmanız ve Client ID / Client Secret almanız gerekecektir.
4. Google Cloud Console'da "Authorized redirect URIs" kısmına Supabase'den aldığınız "Callback URL"i eklemeyi unutmayın.

### 6. Uygulamayı Çalıştırma
Geliştirme sunucusunu başlatmak için:

```bash
npm run dev
```

Uygulamayı tarayıcınızda `http://localhost:3000` adresinde görüntüleyebilirsiniz.

### 7. PWA ve Canlı Sürüm (Build)
Uygulamanın üretim sürümünü (PWA özellikleriyle birlikte) test etmek için:

```bash
npm run build
npm start
```

## 📂 Proje Yapısı

- `app/`: Sayfalar ve layout (Next.js App Router).
  - `page.tsx`: Anasayfa
  - `yarisma/`: Yarışma sayfası
  - `cuzdan/`: Cüzdan sayfası
  - `pazar/`: Pazar/Market sayfası
- `components/`: Tekrar kullanılabilir bileşenler (Header, BottomNav).
- `context/`: Auth (Giriş) durumu yönetimi.
- `public/`: Görseller ve ikonlar.
- `utils/`: Supabase istemci ve sunucu yardımcı fonksiyonları.
