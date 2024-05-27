import markdownit from 'markdown-it';
import hljs from 'highlight.js';
import styles from './style.module.css';

export default function MarkdownParser({markdown}) {
    const mdit = markdownit({
        html: true,
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return `<div class="${styles["code-block"]}"><pre><code>` +
                        hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                        '</code></pre></div>';
                } catch (__) { }
            }

            return `<div class="${styles["code-block"]}"><pre><code>` + mdit.utils.escapeHtml(str) + '</code></pre></div>';
        }
    });
    return (
        <div 
            dangerouslySetInnerHTML={{ __html: mdit.render(markdown) }} 
            className={styles["md-parser"]}
        />
    );
}