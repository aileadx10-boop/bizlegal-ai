/**
 * Gemini API Client for SEO Automation
 * Supports content generation, social media adaptation, and tool descriptions
 */

export interface GeminiConfig {
  apiKey: string
  model?: string
}

export interface ContentRequest {
  topic: string
  jurisdiction: string
  keywords: string[]
  wordCount?: number
  contentType: 'seo-page' | 'tool-description' | 'social-post' | 'meta-tags'
  platform?: 'twitter' | 'linkedin' | 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'threads'
}

export interface ContentResponse {
  title?: string
  meta?: string
  content?: string
  keywords?: string[]
  socialPosts?: SocialPost[]
  toolDescription?: ToolDescription
}

export interface SocialPost {
  platform: string
  content: string
  hashtags: string[]
  imageUrl?: string
  scheduledTime?: string
}

export interface ToolDescription {
  name: string
  shortDescription: string
  fullDescription: string
  features: string[]
  useCases: string[]
  tags: string[]
}

export class GeminiClient {
  private apiKey: string
  private model: string
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models'

  constructor(config: GeminiConfig) {
    this.apiKey = config.apiKey
    this.model = config.model || 'gemini-2.0-flash'
  }

  async generateContent(request: ContentRequest): Promise<ContentResponse> {
    const prompt = this.buildPrompt(request)
    
    const response = await fetch(`${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: request.contentType === 'seo-page' ? 4096 : 1024,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${await response.text()}`)
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    
    return this.parseResponse(text, request)
  }

  async generateSocialPosts(topic: string, content: string): Promise<SocialPost[]> {
    const prompt = `Adapt this content for 7 social media platforms. Return JSON array with platform-specific posts:

Topic: ${topic}
Content: ${content.substring(0, 2000)}

Platforms: Twitter (280 chars), LinkedIn (professional, 1300 chars), Facebook (engaging, 500 chars), 
Instagram (visual caption, 300 chars + emojis), TikTok (script hook, 150 chars), 
YouTube (description, 500 chars), Threads (casual, 500 chars)

Include 3-5 relevant hashtags per platform.

Return ONLY valid JSON array in this format:
[
  {"platform": "twitter", "content": "...", "hashtags": ["#tag1", "#tag2"]},
  {"platform": "linkedin", "content": "...", "hashtags": ["#tag1"]},
  ...
]`

    const response = await fetch(`${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    })

    if (!response.ok) throw new Error(`Gemini API error: ${response.status}`)

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      const json = jsonMatch ? jsonMatch[0] : '[]'
      return JSON.parse(json) as SocialPost[]
    } catch {
      return []
    }
  }

  async generateToolIdea(category: string): Promise<ToolDescription | null> {
    const prompt = `Generate a new legal tech tool idea for category: ${category}

Focus on: compliance automation, legal document analysis, regulatory intelligence, or risk assessment

Return JSON in this exact format:
{
  "name": "Tool Name",
  "shortDescription": "One sentence description (max 100 chars)",
  "fullDescription": "Detailed description (200-300 words)",
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "useCases": ["Use case 1", "Use case 2"],
  "tags": ["tag1", "tag2", "tag3"]
}`

    const response = await fetch(`${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.9,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    })

    if (!response.ok) throw new Error(`Gemini API error: ${response.status}`)

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      const json = jsonMatch ? jsonMatch[0] : '{}'
      return JSON.parse(json) as ToolDescription
    } catch {
      return null
    }
  }

  private buildPrompt(request: ContentRequest): string {
    const { topic, jurisdiction, keywords, wordCount = 1200, contentType } = request

    if (contentType === 'seo-page') {
      return `Write a comprehensive SEO guide about "${topic}" for jurisdiction: ${jurisdiction}

Keywords to include: ${keywords.join(', ')}
Target word count: ${wordCount}

Requirements:
- Professional, authoritative tone for legal/compliance professionals
- Include regulatory references, compliance requirements, timelines
- Add practical next steps and risk warnings
- Structure with H2/H3 headings
- End with 3-5 FAQs

Return in this EXACT format:
TITLE: <max 65 characters>
META: <150-160 characters>
KEYWORDS: <comma-separated>
CONTENT:
<h2>Overview</h2>
<p>...</p>
<h2>Key Requirements</h2>
<p>...</p>
<h2>Compliance Steps</h2>
<p>...</p>
<h2>FAQ</h2>
<h3>...</h3>
<p>...</p>`
    }

    if (contentType === 'tool-description') {
      return `Write a compelling tool description for a legal tech tool about "${topic}"

Include:
- Problem it solves
- Key features (3-5)
- Benefits for users
- Use cases

Return in JSON format:
{
  "name": "...",
  "shortDescription": "...",
  "fullDescription": "...",
  "features": [],
  "useCases": [],
  "tags": []
}`
    }

    if (contentType === 'social-post' && request.platform) {
      return `Write a ${request.platform} post about "${topic}" for jurisdiction: ${jurisdiction}

Platform requirements:
- Twitter: 280 chars max, punchy, 2-3 hashtags
- LinkedIn: Professional tone, 1000 chars, industry insights, 3-5 hashtags
- Facebook: Engaging, conversational, 500 chars, 3-4 hashtags
- Instagram: Visual caption, emojis, 300 chars, 5-8 hashtags
- TikTok: Hook-focused, 150 chars, trending style
- YouTube: Description format, 500 chars, SEO keywords
- Threads: Casual, conversational, 500 chars

Keywords: ${keywords.join(', ')}

Return JSON:
{"content": "...", "hashtags": []}`
    }

    return `Generate content about "${topic}" for ${jurisdiction}`
  }

  private parseResponse(text: string, request: ContentRequest): ContentResponse {
    const result: ContentResponse = {}

    if (request.contentType === 'seo-page') {
      const titleMatch = text.match(/TITLE:\s*(.+?)(?=\n|$)/i)
      const metaMatch = text.match(/META:\s*(.+?)(?=\n|$)/i)
      const keywordsMatch = text.match(/KEYWORDS:\s*(.+?)(?=\n|$)/i)
      const contentMatch = text.match(/CONTENT:\s*([\s\S]+)/i)

      result.title = titleMatch?.[1]?.trim() || request.topic
      result.meta = metaMatch?.[1]?.trim() || `Guide to ${request.topic}`
      result.content = contentMatch?.[1]?.trim() || text
      result.keywords = keywordsMatch?.[1]?.split(',').map(k => k.trim()) || request.keywords
    } else if (request.contentType === 'tool-description') {
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        const json = jsonMatch ? jsonMatch[0] : '{}'
        result.toolDescription = JSON.parse(json) as ToolDescription
      } catch {
        result.toolDescription = {
          name: request.topic,
          shortDescription: text.substring(0, 100),
          fullDescription: text,
          features: [],
          useCases: [],
          tags: request.keywords,
        }
      }
    }

    return result
  }
}
