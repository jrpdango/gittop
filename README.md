# Gittop

![Gittop Banner](https://jrpdango.github.io/gittop/gittop-full-transparent.png)

A read-only viewer for the most recent state of the default branch of a GitHub repository. It allows you to share personal repos without having to make them public.

While this project is mainly focused on sharing private repos with others, it can also be used to view the content of a public repo of your choosing.

## Demo

[Link to demo](https://jrpdango.github.io/gittop/display?repo=gittop-demo&owner=jrpdango&token=wooyEsK5JWrChsKfwpLDqMK4w4zDiCpew6fDgSjDr2DDlsOeJsK6Ix0Awq85w4l-FU3Cq8KKRgTDuy56w749LC7CnsO-wq09M8OGeiczCnHDujcNwqfDvWjDucO_fH_Cq8O2wrXCiMO9DWrDksKkHT3CmsKfdMOMFMKRwojDm8OAWWMdfsKLVsOaAMKxBkwYwrt7w5oeelPCgC7Cn17Cq8O9AyTDtsKMw6JZwpVxXsKFfcOv)

This is a [private repository](https://github.com/jrpdango/gittop-demo) that you can view through the link above.

Try it yourself [here](https://jrpdango.github.io/gittop/)!

## Features

- Preview public and private GitHub repositories
- Files are not stored, everything remains hosted by GitHub
- Generate a shareable link that you can give to friends, other devs, potential employers, etc.
- Links are self-contained -- whoever opens them won't need to provide credentials or log in
- Preview text, images, and PDFs in-app
- Syntax highlighting for common programming languages and file extensions

## How to use

1. [Open up Gittop](https://jrpdango.github.io/gittop/).
2. Get the URL of the repository you want to view.
3. Get a [personal access token](#how-do-i-get-my-github-personal-access-token) (preferably fine-grained, read-only, and only scoped to that specific repo).
4. Go to the site and input both in their appropriate fields.
5. Click "Generate URL". If done correctly, a new URL should appear in the bottom field.
6. Copy the generated URL or click the "Visit URL" button to view the repo.

The URL you generated can be shared with whomever you choose, but please note that while your token is encrypted in URL, it is still there and can be decoded. See [About Generated URLs](#about-generated-urls) below.

## How do I get my GitHub Personal Access Token?

1. Visit your GitHub account's settings. Navigate to "Developer settings" on the left-hand side, click "Personal access tokens", then "Fine-grained tokens". Lastly, click "Generate new token". You'll be asked to login or enter your 2FA code if you have that set up. [Click this link to go there.](https://github.com/settings/personal-access-tokens/new)

2. Assign a name and expiration for your token.

### It's recommended to limit the permissions a token can have as much as possible.

### Unless you know what you're doing, try having only one (read-only) token for each repo you want to access.

3. Click "Only select repositories" and pick the repository you want the token to have access in.

4. Click on "Repository permissions", and set "Contents" to "Read-only".

5. Review your choices, then click "Generate token".

## How it works

It uses the GitHub contents API to preview the repository you specify as long as an access token is provided.

Gittop never hosts your files, as the app only pulls data from GitHub itself. <br />It simply shows you whatever you've pushed to your remote repo, meaning it never actually stores anything.  

## Limitations

- Only the repo's default branch is previewable.
- Because your files are never downloaded by the app, file previews are determined by their extensions and not their MIME types. This means that files with the wrong extensions may cause Gittop to misbehave.
- A personal access token is still needed even when accessing public repos due to the GitHub API having a stricter quota with unauthenticated requests.
- Local paths in `.md` files don't work properly since Gittop cannot directly access the source. 

#### About Generated URLs

URLs you generate have parameters that allow Gittop to display your private repos. One of these is an encrypted string that represents your access token. **Please only share your URL with people you trust.** As long as you only provide that token read access to a repo, it should be fine even in the case of a compromise.

## License

<div align="center">
<pre>
Copyright © 2024 Jasper Robert Pigason

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
</pre>
</div>
