import pages from '../content/notebook.json';
import { renderNotebook } from '../lib/notebook';

export default function Notebook({ slug }: { slug: string }) {
  // All markup is authored locally in notebook.json; no user input is rendered.
  return <div dangerouslySetInnerHTML={{ __html: renderNotebook(pages, slug) }} />;
}
