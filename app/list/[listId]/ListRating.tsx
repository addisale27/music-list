import Avatar from "@/app/components/Avatar";
import Heading from "@/app/components/Heading";
import { Rating } from "@mui/material";
import moment from "moment";

interface ListRatingProps {
  list: any;
}
const ListRating: React.FC<ListRatingProps> = ({ list }) => {
  if (list.reviews.length === 0) return null;
  return (
    <div className="">
      <Heading title="Music Reviews" />
      <div className="text-sm mt-2">
        {list.reviews &&
          list.reviews.map((review: any) => {
            return (
              <div key={review.id} className="max-w-[300px]">
                <div className="flex gap-2 items-center">
                  <div>
                    <Avatar src={review.user.image} />
                  </div>
                  <div className="font-semibold">{review.user.name}</div>
                  <div className="font-light">
                    {moment(review.createdDate).fromNow()}
                  </div>
                </div>
                <div className="mt-2">
                  <Rating value={review.rating} readOnly />
                  <div className="ml-4">{review.comment}</div>
                  <hr className="my-4" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
