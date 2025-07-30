import { motion } from "framer-motion";
import { formatDate, readingTime, type Post } from "@/lib/utils";
import { Badge } from "./ui/badge";

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  return (
    <motion.div
      class="relative flex bg-card outline outline-border rounded-lg p-6 w-full"
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <a
        href={`/blog/${post.id}/`}
        class="flex flex-col w-full !text-foreground"
      >
        {post.data.heroImage && (
          <img
            width={720}
            height={360}
            src={post.data.heroImage}
            alt=""
            loading="lazy"
            decoding="async"
            class="w-full !h-40 object-cover rounded-lg mb-3"
          />
        )}

        <h4 class="!text-white !text-md font-bold mb-1">{post.data.title}</h4>
        <p class="text-sm">{post.data.description}</p>

        <div class="flex flex-col sm:flex-row justify-between sm:items-center pt-4 gap-4">
          <p class="text-sm">
            <time datetime={post.data.pubDate.toISOString()}>
              {formatDate(post.data.pubDate)} - {readingTime(post.body)}
            </time>
          </p>
          <div class="flex gap-2 flex-wrap">
            {post.data.tags.map((tag) => (
              <Badge key={tag}>#{tag}</Badge>
            ))}
          </div>
        </div>
      </a>
    </motion.div>
  );
};
export default PostCard;
