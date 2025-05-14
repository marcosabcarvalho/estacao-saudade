








# 📻 Estação Saudade – Aplicativo Android com TWA (Trusted Web Activity)

Este projeto empacota a versão PWA do site [Estação Saudade](https://marcosabcarvalho.github.io/estacao-saudade/radio.html) como um aplicativo Android nativo utilizando **Trusted Web Activity (TWA)**.

O objetivo é transformar a experiência de uma rádio retrô hospedada em GitHub Pages em um app Android completo, com splash screen, ícone, e sem barra de navegação.

---

## ✅ Pré-requisitos

- Projeto PWA hospedado via HTTPS  
  Exemplo: `https://marcosabcarvalho.github.io/estacao-saudade/radio.html`

- Arquivo `manifest.json` válido no seu site com:
  - `start_url`
  - `display: "standalone"`
  - `icons` (192x192 e 512x512)

- Android Studio instalado  
- Git instalado e configurado (opcional)

---

## 🚀 Passo a passo: Empacotar com TWA

### 1. Criar o projeto no Android Studio

- Novo projeto → **"No Activity"**
- Nome do app: `Estação Saudade`
- Package name: `com.github.estacaosaudade`
- Linguagem: **Kotlin**
- Mínimo SDK: `API 21 (Lollipop)` ou superior

---

### 2. Adicionar dependência TWA

Edite o arquivo `app/build.gradle` e adicione:

```groovy
dependencies {
    implementation 'androidx.browser:browser:1.6.0'
}
```

---

### 3. Criar o arquivo `LauncherActivity.kt`

Crie um novo arquivo Kotlin em:
```
app/src/main/java/com/github/estacaosaudade/LauncherActivity.kt
```

Conteúdo:

```kotlin
package com.github.estacaosaudade

import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.browser.customtabs.CustomTabsIntent
import androidx.browser.trusted.TrustedWebUtils

class LauncherActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val url = "https://marcosabcarvalho.github.io/estacao-saudade/radio.html"
        val intent = CustomTabsIntent.Builder().build()
        TrustedWebUtils.launchAsTrustedWebActivity(this, intent, Uri.parse(url), null)
        finish()
    }
}
```

---

### 4. Configurar `AndroidManifest.xml`

Edite o arquivo `app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.github.estacaosaudade">
    
    <application
        android:label="Estação Saudade"
        android:theme="@style/Theme.AppCompat.Light.NoActionBar">
        
        <activity
            android:name=".LauncherActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
        
    </application>
</manifest>
```

---

### 5. Gerar fingerprint SHA-256 da sua chave debug

No terminal (Linux/macOS):

```bash
keytool -list -v \
  -keystore ~/.android/debug.keystore \
  -alias androiddebugkey \
  -storepass android
```

Copie o valor da linha `SHA256:`  
**Exemplo:**  
```
B9:46:61:C9:D6:92:AC:36:80:58:5E:4E:C4:D0:DB:20:9E:15:20:D0:4B:24:24:BE:33:39:8F:A4:52:B8:7D:9B
```

---

### 6. Criar o arquivo `.well-known/assetlinks.json`

📁 No seu repositório GitHub Pages, crie a pasta:

```
.well-known/
```

📄 Crie dentro dela o arquivo `assetlinks.json` com este conteúdo:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.github.estacaosaudade",
      "sha256_cert_fingerprints": [
        "B9:46:61:C9:D6:92:AC:36:80:58:5E:4E:C4:D0:DB:20:9E:15:20:D0:4B:24:24:BE:33:39:8F:A4:52:B8:7D:9B"
      ]
    }
  }
]
```

📌 Suba esse arquivo em:
```
https://marcosabcarvalho.github.io/.well-known/assetlinks.json
```

---

### 7. Rodar o app

- No Android Studio, clique em ▶️ "Run app"
- Instale no celular via cabo USB ou emulador
- O app abrirá sua rádio retrô em tela cheia e sem barra de endereço

---

## 🎯 Resultado Final

- A rádio retrô é exibida como um app nativo
- Funciona como Progressive Web App (PWA) com aparência nativa
- Pode ser publicado na **Google Play Store**
- Atualizações no seu site são refletidas automaticamente no app

---

## 📁 Estrutura básica do repositório

```
.
├── app/
│   └── src/
│       └── main/
│           ├── AndroidManifest.xml
│           └── java/com/github/estacaosaudade/LauncherActivity.kt
├── .well-known/
│   └── assetlinks.json
```

---

## ✨ Créditos

Desenvolvido com carinho nostálgico por [Marcos A. B. de Carvalho](https://github.com/marcosabcarvalho)  
Empacotado com ❤️ pela Amora (ChatGPT)




Criar subdominio radio.ideiasbits.com.br


✅ Passo 1 – Adicionar registro DNS tipo CNAME ou A

    Vá até DNS > Gerenciamento de DNS no painel da Cloudflare.

    Clique em Adicionar registro.

    Preencha assim:

🔸 Se quiser usar um registro CNAME:
Campo	Valor
Tipo	CNAME
Nome	radio
Destino	ideiasbits.com.br
Proxy	☁️ Ativado (Com proxy)
TTL	Auto
✅ Passo 2 – Salvar e verificar

    Salve o registro.

    Verifique se o ícone da nuvem está laranja.

    Espere de 1 a 5 minutos para propagação (geralmente é quase instantâneo na Cloudflare).

✅ Passo 3 – Reaplicar ou confirmar a regra de redirecionamento

Agora volte na aba das Regras de Página e:

    Edite a regra já criada ou crie novamente, se quiser garantir.

    Use os padrões:

http://radio.ideiasbits.com.br/*
https://radio.ideiasbits.com.br/*

➡️ Ambos devem redirecionar para:

https://ideiasbits.com.br/radio.html