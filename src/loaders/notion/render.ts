import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client';
import { cloudinary } from '../../util/cloudinary';

function renderRichText(rich_text: RichTextItemResponse[]) {
  return rich_text
    .map((rt) => {
      let text = rt.plain_text;

      const tags: Record<keyof RichTextItemResponse['annotations'], string> = {
        underline: 'u',
        strikethrough: 'del',
        code: 'code',
        color: 'span',
        italic: 'em',
        bold: 'strong',
      } as const;

      Object.keys(tags).forEach((annotation) => {
        const tag = annotation as keyof RichTextItemResponse['annotations'];
        if (tag === 'color') {
          // skip colors because I don’t want to deal with them lol
        } else if (rt.annotations[tag]) {
          text = `<${tags[tag]}>${text}</${tags[tag]}>`;
        }
      });

      if (rt.href) {
        text = `<a href="${rt.href}">${text}</a>`;
      }

      return text;
    })
    .join('');
}

async function renderImage(
  block: Extract<BlockObjectResponse, { type: 'image' }>,
) {
  let markup = '';
  let imageUrl;

  switch (block.image.type) {
    case 'external':
      imageUrl = block.image.external.url;
      break;

    case 'file':
      imageUrl = block.image.file.url;
      break;
  }

  try {
    const upload = await cloudinary.uploader.upload(imageUrl, {
      overwrite: false,
      use_filename: true,
      unique_filename: false,
    });

    imageUrl = cloudinary.url(upload.public_id, {
      width: 1600,
      height: 900,
      crop: 'fit',
      quality: 'auto',
      format: 'auto',
    });
  } catch (err) {
    console.error(err);
  }

  const caption = renderRichText(block.image.caption);

  markup = `<img src="${imageUrl}" alt="${block.image.caption}" />`;

  if (caption) {
    markup = `<figure>${markup} <figcaption>${caption}</figcaption></figure>`;
  }

  return markup;
}

/**
 * This is a very rough function to turn Notion blocks into an HTML string.
 *
 * This is far from comprehensive and it’s missing a whole bunch of blocks but
 * it covers my use case, so... whatever. Good enough.
 */
export async function blocksToHTML(blocks: BlockObjectResponse[]) {
  let html: string[] = [];
  let insideUnorderedList = false;
  let insideOrderedList = false;

  for (let block of blocks) {
    if (block.type === 'bulleted_list_item' && !insideUnorderedList) {
      html.push('<ul>');
      insideUnorderedList = true;
    }

    if (block.type !== 'bulleted_list_item' && insideUnorderedList) {
      html.push('</ul>');
      insideUnorderedList = false;
    }

    if (block.type === 'numbered_list_item' && !insideOrderedList) {
      html.push('<ol>');
      insideOrderedList = true;
    }

    if (block.type !== 'numbered_list_item' && insideOrderedList) {
      html.push('</ol>');
      insideOrderedList = false;
    }

    switch (block.type) {
      case 'heading_1':
        html.push(`<h1>${renderRichText(block.heading_1.rich_text)}</h1>`);
        break;

      case 'heading_2':
        html.push(`<h2>${renderRichText(block.heading_2.rich_text)}</h2>`);
        break;

      case 'heading_3':
        html.push(`<h3>${renderRichText(block.heading_3.rich_text)}</h3>`);
        break;

      case 'bulleted_list_item':
        html.push(
          `<li>${renderRichText(block.bulleted_list_item.rich_text)}</li>`,
        );
        break;

      case 'numbered_list_item':
        html.push(
          `<li>${renderRichText(block.numbered_list_item.rich_text)}</li>`,
        );
        break;

      case 'paragraph':
        html.push(`<p>${renderRichText(block.paragraph.rich_text)}</p>`);
        break;

      case 'image':
        const img = await renderImage(block);

        html.push(img);
        break;

      // These are the blocks we’re NOT using but wanted to list them in case
      // we end up needing them later.
      case 'video':
      case 'quote':
      case 'audio':
      case 'bookmark':
      case 'breadcrumb':
      case 'callout':
      case 'child_database':
      case 'child_page':
      case 'code':
      case 'column':
      case 'column_list':
      case 'divider':
      case 'embed':
      case 'equation':
      case 'file':
      case 'link_preview':
      case 'link_to_page':
      case 'pdf':
      case 'synced_block':
      case 'table':
      case 'table_of_contents':
      case 'table_row':
      case 'template':
      case 'to_do':
      case 'toggle':
      case 'unsupported':
      default:
        console.error(`unhandled block ${block.type}`);
    }
  }

  return html.join('\n');
}
