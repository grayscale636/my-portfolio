# **Enhanced Portfolio by Once UI**

my edited website link<br>
👇👇👇
https://gery.irmlabs.my.id/about

A highly customized portfolio featuring AI chatbot integration, interactive tech stacks, and advanced content management.

![Enhanced Portfolio](https://demo.magic-portfolio.com/images/og/home.jpg)

# **✨ New Features Added**

## **🤖 AI Chatbot Integration**
- **Dify-powered chatbot** for personalized Q&A about experience and skills
- **Floating chat widget** with smooth animations and tooltips
- **Auto-popup notifications** every 10 seconds to engage visitors
- **Real-time conversation** with fallback responses

## **💻 Interactive Tech Stacks**
- **26 technology icons** with hover effects and brand colors
- **Comprehensive tech coverage**: Python, JavaScript, SQL, ML/AI frameworks, Cloud, DevOps
- **Visual skill showcase** with animated cards and responsive layout

## **📚 Publications Section**
- **Academic publications** with clickable links
- **Professional formatting** with institutions and publication years
- **Direct access** to research papers and academic work

## **🎨 Enhanced UX/UI**
- **TypeWriter animation** for dynamic role display
- **Justified text formatting** throughout content sections
- **Improved spacing** and visual hierarchy
- **Responsive design** optimized for all devices

# **Getting started**

This portfolio was built with [Once UI](https://once-ui.com) for [Next.js](https://nextjs.org). It requires Node.js v18.17+.

**1. Clone the repository**
```bash
git clone https://github.com/your-username/enhanced-portfolio.git
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**
Create `.env.local` in your root directory:
```env
DIFY_API_KEY=your_dify_api_key_here
DIFY_BASE_URL=YOUR_DIFY_BASE_URL
DIFY_USER=your_user_id
```

**4. Run dev server**
```bash
npm run dev
```

**5. Edit config**
```
src/app/resources/config
```

**6. Edit content**
```
src/app/resources/content
```

**7. Customize about page**
```
src/app/about/page.tsx - Add your personal information
src/components/about/TechStacks.tsx - Modify tech stack icons
```

**8. Create blog posts / projects**
```
Add a new .mdx file to src/app/blog/posts or src/app/work/projects
```

# **Documentation**

Docs available at: [docs.once-ui.com](https://docs.once-ui.com/docs/magic-portfolio/quick-start)

## **🔧 AI Chatbot Setup**

To enable the AI chatbot functionality:

1. **Get Dify API credentials** from your [Dify Cloud](https://dify.ai/) dashboard
2. **Add environment variables** to `.env.local`:
   ```env
   DIFY_API_KEY=app-xxxxxxxxxxxxxxxx
   DIFY_BASE_URL=YOUR_DIFY_BASE_URL
   DIFY_USER=user-xxxxxxxx
   ```
3. **Test the chatbot** by clicking the floating chat icon in the bottom right

## **💻 Tech Stack Customization**

Modify your tech stacks in `/src/components/about/TechStacks.tsx`:

```tsx
// Add new technologies with React Icons
import { SiYourTech } from 'react-icons/si';

// Configure icon colors (brand colors recommended)
const techData = [
  { icon: SiYourTech, name: "Your Tech", color: "#brand-color" }
];
```

# **Features**

## **🤖 AI-Powered Interaction**
- **Dify chatbot integration** for personalized visitor engagement
- **Auto-popup notifications** to encourage interaction
- **Real-time responses** about your background and experience
- **Fallback system** for robust conversation handling

## **💻 Interactive Tech Showcase**
- **26 technology icons** with hover animations and brand colors
- **Comprehensive coverage**: your highlight
- **Responsive grid layout** with smooth transitions
- **Visual skill representation** for immediate impact

## **📚 Professional Content**
- **Publications section** with academic papers and research
- **Clickable links** to external publications
- **TypeWriter animation** for dynamic role display
- **Justified text formatting** for professional appearance

## **Once UI Foundation**
- All tokens, components & features of [Once UI](https://once-ui.com)
- Enhanced with custom components and interactions

## **SEO & Performance**
- Automatic open-graph and X image generation with next/og
- Automatic schema and metadata generation based on the content file
- Optimized build size and loading performance

## **Design & UX**
- Responsive layout optimized for all screen sizes
- Modern design with enhanced animations and smooth transitions
- Professional typography with justified text alignment
- Floating chat widget with tooltip interactions
- Interactive hover effects on tech stack icons
- Seamless navigation with improved visual hierarchy

## **Content Management**
- Easy-to-edit content files for quick updates
- MDX support for rich blog posts and project descriptions
- Customizable about page with personal information sections
- Publication management with external linking
- Media gallery support for project showcases

## **Localization & Deployment**
- Endless customization options through [data attributes](https://once-ui.com/docs/theming)
- Vercel deployment ready with environment variable support
- Automatic builds with optimized performance

## **Content Management System**
- Render sections conditionally based on the content file
- Enable or disable pages for blog, work, gallery and about / CV
- Generate and display social links automatically
- Set up password protection for URLs
- MDX support for rich content creation

## **Internationalization**
- A localized version is available with the next-intl library
- To use localization, switch to the 'i18n' branch

# **🚀 Deployment**

## **Vercel Deployment**

1. **Deploy to Vercel** using the button below
2. **Add environment variables** in Vercel dashboard:
   - `DIFY_API_KEY`: Your Dify API key
   - `DIFY_BASE_URL`: YOUR_DIFY_BASE_URL
   - `DIFY_USER`: Your user identifier
3. **Build and deploy** automatically

## **Local Production Build**

Test your production build locally:

```bash
npm run build
npm start
```

## **Environment Variables**

Required for AI chatbot functionality:

```env
DIFY_API_KEY=app-xxxxxxxxxxxxxxxx
DIFY_BASE_URL=YOUR_DIFY_BASE_URL
DIFY_USER=user-xxxxxxxx
```

# **Authors**

**Enhanced Portfolio** - Customized with AI integration and advanced features

**Original Magic Portfolio Authors:**
- Lorant Toth: [Threads](https://www.threads.net/@lorant.one), [LinkedIn](https://www.linkedin.com/in/tothlorant/)  
- Zsofia Komaromi: [Threads](https://www.threads.net/@zsofia_kom), [LinkedIn](https://www.linkedin.com/in/zsofiakomaromi/)

Localization added by [François Hernandez](https://github.com/francoishernandez)

# **Get involved**

- Join the [Design Engineers Club on Discord](https://discord.com/invite/5EyAQ4eNdS) and share your portfolio with us!
- Report a [bug](https://github.com/once-ui-system/magic-portfolio/issues/new?labels=bug&template=bug_report.md).

# **License**

Distributed under the CC BY-NC 4.0 License.
- Commercial usage is not allowed.
- Attribution is required.
- You can extend the license to commercial use by purchasing a [Once UI Pro](https://once-ui.com/pricing) license.

See `LICENSE.txt` for more information.

# **Deploy with Vercel**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fenhanced-portfolio&project-name=enhanced-portfolio&repository-name=enhanced-portfolio&redirect-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fenhanced-portfolio&demo-title=Enhanced%20Portfolio&demo-description=AI-powered%20portfolio%20with%20interactive%20tech%20stacks&demo-url=https%3A%2F%2Fyour-domain.vercel.app)

**⚠️ Important:** Don't forget to add your environment variables in Vercel dashboard after deployment!
