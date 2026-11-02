import Link from "next/link";
import type { NoteTopic } from "@/lib/content";
import { formatMonth } from "@/lib/content";
import { CardGo, Icon } from "./Icon";

export function NoteCard({ topic }: { topic: NoteTopic }) {
  return (
    <Link className="hub-tile note-card" href={`/notes/${topic.slug}`}>
      <span className="hub-tile-head">
        <span className="tile-icon">
          <Icon name={topic.icon} size={26} />
        </span>
        <CardGo />
      </span>
      <span className="hub-tile-kicker">
        {topic.label} · <time dateTime={topic.updated}>{formatMonth(topic.updated)}</time>
      </span>
      <span className="hub-title">{topic.title}</span>
      <span className="hub-line">{topic.line}</span>
    </Link>
  );
}
