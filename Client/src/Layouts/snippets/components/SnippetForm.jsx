import { useRef, useState } from 'react'
import { ChevronLeft, Save, X } from 'lucide-react'

const standardLanguages = ['JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS', 'SQL', 'Bash', 'JSON', 'Other']
const customLanguageOption = '__custom__'

const initialForm = {
    title: '',
    description: '',
    code: '',
    category: '',
    language: '',
}

const fieldClassName = 'mt-1.5 w-full rounded-lg border border-[#2B3040] bg-[#12151C] px-3 py-2.5 text-sm text-[#E7E9EE] outline-none transition-colors placeholder:text-[#5A6275] focus:border-[#6E6BF4]'

const SnippetForm = ({ onClose, onSave, initialSnippet, existingSnippets = [] }) => {
    const [form, setForm] = useState(() => initialSnippet ? {
        title: initialSnippet.title || '',
        description: initialSnippet.description || '',
        code: initialSnippet.code || '',
        category: initialSnippet.category || '',
        language: initialSnippet.language || '',
    } : initialForm)
    const [isCustomLanguage, setIsCustomLanguage] = useState(false)
    const [customLanguage, setCustomLanguage] = useState('')
    const [titleError, setTitleError] = useState('')
    const [languageError, setLanguageError] = useState('')
    const [tags, setTags] = useState(() => initialSnippet?.tags || [])
    const [tagInput, setTagInput] = useState('')
    const formRef = useRef(null)

    const updateField = (event) => {
        setForm((currentForm) => ({ ...currentForm, [event.target.name]: event.target.value }))
        if (event.target.name === 'title') setTitleError('')
    }

    const updateLanguage = (event) => {
        if (event.target.value === customLanguageOption) {
            setIsCustomLanguage(true)
            setCustomLanguage('')
            setLanguageError('')
            return
        }
        setIsCustomLanguage(false)
        setCustomLanguage('')
        setLanguageError('')
        setForm((currentForm) => ({ ...currentForm, language: event.target.value }))
    }

    const addTag = (value) => {
        const tag = value.trim().replace(/,$/, '')
        if (tag && !tags.some((existingTag) => existingTag.toLowerCase() === tag.toLowerCase())) {
            setTags((currentTags) => [...currentTags, tag])
        }
        setTagInput('')
    }

    const submitForm = (event) => {
        event.preventDefault()
        const title = form.title.trim()
        if (!title) {
            setTitleError('Enter a title to continue.')
            return
        }
        const hasDuplicateTitle = existingSnippets.some((snippet) => (
            (!initialSnippet || String(snippet.id) !== String(initialSnippet.id))
            && String(snippet.title || '').trim().toLowerCase() === title.toLowerCase()
        ))
        if (hasDuplicateTitle) {
            setTitleError('A snippet with this name already exists. Choose a different title.')
            return
        }

        const language = (isCustomLanguage ? customLanguage : form.language).trim()
        if (!language) {
            setLanguageError('Enter a language to continue.')
            return
        }

        onSave({
            ...form,
            title,
            language,
            tags,
        })
    }

    return (
        <main className="flex-1 bg-[#0B0D12] px-5 pb-10 pt-7 sm:px-8 sm:pt-8">
            <div className="mx-auto w-full max-w-180">
                <button type="button" onClick={onClose} className="inline-flex min-h-8 items-center gap-1 text-sm font-medium text-[#8B93A7] transition-colors hover:text-[#E7E9EE]">
                    <ChevronLeft aria-hidden="true" size={16} />
                    Back to snippets
                </button>
                <header className="mt-5 mb-5">
                    <h1 className="text-2xl font-bold tracking-tight text-[#E7E9EE] sm:text-[28px]">{initialSnippet ? 'Edit snippet' : 'Create new snippet'}</h1>
                    <p className="mt-2 text-sm text-[#8B93A7] sm:text-[15px]">{initialSnippet ? 'Keep this snippet up to date.' : "Save something you'll want again later."}</p>
                </header>

                <form
                    ref={formRef}
                    onSubmit={submitForm}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey) && event.target.name !== 'tags') {
                            event.preventDefault()
                            formRef.current?.requestSubmit()
                        }
                    }}
                    className="space-y-4"
                >
                    <label className="block text-sm font-semibold text-[#E7E9EE]">
                        Title <span className="text-[#E87582]">*</span>
                        <input required autoFocus name="title" value={form.title} onChange={updateField} placeholder="Express CORS setup" aria-invalid={Boolean(titleError)} aria-describedby={titleError ? 'snippet-title-error' : undefined} className={fieldClassName} />
                        {titleError && <span id="snippet-title-error" role="alert" className="mt-1.5 block text-xs font-normal text-[#E87582]">{titleError}</span>}
                    </label>

                    <label className="block text-sm font-semibold text-[#E7E9EE]">
                        Description <span className="font-normal text-[#737C90]">(optional)</span>
                        <textarea name="description" value={form.description} onChange={updateField} rows={2} placeholder="What does this solve, and when would you reach for it?" className={`${fieldClassName} resize-y`} />
                    </label>

                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                        <label className="block text-sm font-semibold text-[#E7E9EE]">
                            Language <span className="text-[#E87582]">*</span>
                            <select required name="language" value={isCustomLanguage ? customLanguageOption : form.language} onChange={updateLanguage} className={fieldClassName}>
                                <option value="" disabled>Select a language</option>
                                {[...new Set([...standardLanguages, ...existingSnippets.map((snippet) => snippet.language).filter(Boolean)])].map((language) => <option key={language} value={language}>{language}</option>)}
                                <option value={customLanguageOption}>Add a language...</option>
                            </select>
                            {isCustomLanguage && (
                                <input
                                    required
                                    autoFocus
                                    aria-label="Custom language"
                                    value={customLanguage}
                                    onChange={(event) => {
                                        setCustomLanguage(event.target.value)
                                        setLanguageError('')
                                    }}
                                    placeholder="Enter a language"
                                    className={fieldClassName}
                                />
                            )}
                            {languageError && <span role="alert" className="mt-1.5 block text-xs font-normal text-[#E87582]">{languageError}</span>}
                        </label>
                        <label className="block text-sm font-semibold text-[#E7E9EE]">
                            Category <span className="font-normal text-[#737C90]">(optional)</span>
                            <select name="category" value={form.category} onChange={updateField} className={fieldClassName}>
                                <option value="">Select a category</option>
                                {['Frontend', 'Backend', 'Database', 'DevOps', 'Testing', 'Other'].map((category) => <option key={category}>{category}</option>)}
                            </select>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="snippet-tags" className="block text-sm font-semibold text-[#E7E9EE]">Tags</label>
                        <div className="mt-1.5 flex min-h-10 flex-wrap items-center gap-2 rounded-lg border border-[#2B3040] bg-[#12151C] px-3 py-2 transition-colors focus-within:border-[#6E6BF4]">
                            {tags.map((tag) => (
                                <span key={tag} className="inline-flex items-center gap-1 rounded-md border border-[#292E3B] bg-[#1A1E28] px-2 py-1 text-xs text-[#C7CBD5]">
                                    {tag}
                                    <button type="button" aria-label={`Remove ${tag} tag`} onClick={() => setTags((currentTags) => currentTags.filter((currentTag) => currentTag !== tag))} className="text-[#8B93A7] hover:text-white">
                                        <X aria-hidden="true" size={13} />
                                    </button>
                                </span>
                            ))}
                            <input
                                id="snippet-tags"
                                name="tags"
                                value={tagInput}
                                onChange={(event) => setTagInput(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ',') {
                                        event.preventDefault()
                                        addTag(tagInput)
                                    } else if (event.key === 'Backspace' && !tagInput && tags.length) {
                                        setTags((currentTags) => currentTags.slice(0, -1))
                                    }
                                }}
                                onBlur={() => tagInput.trim() && addTag(tagInput)}
                                placeholder={tags.length ? 'Add another tag' : 'express, cors, backend'}
                                className="min-w-28 flex-1 bg-transparent text-sm text-[#E7E9EE] outline-none placeholder:text-[#5A6275]"
                            />
                        </div>
                        <p className="mt-1.5 text-xs text-[#737C90]">Press Enter after each tag.</p>
                    </div>

                    <label htmlFor="snippet-code" className="block text-sm font-semibold text-[#E7E9EE]">
                        Code <span className="text-[#E87582]">*</span>
                    </label>
                    <div className="-mt-3 overflow-hidden rounded-xl border border-[#252A37] bg-[#0D1016] focus-within:border-[#6E6BF4]">
                        <div className="flex h-9 items-center justify-between border-b border-[#252A37] bg-[#141821] px-3.5 text-xs text-[#8B93A7]">
                            <span className="inline-flex items-center gap-2">
                                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#7773FF]" />
                                {(isCustomLanguage ? customLanguage : form.language) || 'Plain text'}
                            </span>
                            <span className="hidden font-mono sm:inline">Ctrl + Enter to save</span>
                        </div>
                        <textarea id="snippet-code" required name="code" value={form.code} onChange={updateField} rows={9} placeholder="Paste your code here..." className="block min-h-56 w-full resize-y bg-transparent p-4 font-mono text-[13px] leading-6 text-[#C7CBD5] outline-none placeholder:text-[#5A6275]" />
                    </div>

                    <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
                        <button type="button" onClick={onClose} className="min-h-10 rounded-lg border border-[#2B3040] px-4 text-sm font-semibold text-[#C7CBD5] transition-colors hover:bg-[#1C2029]">Cancel</button>
                        <button type="submit" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#5E5AE6] bg-[#6E6BF4] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#8280F7]">
                            <Save aria-hidden="true" size={16} />
                            {initialSnippet ? 'Save changes' : 'Save snippet'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default SnippetForm