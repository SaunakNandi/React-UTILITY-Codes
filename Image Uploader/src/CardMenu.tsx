import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PhotoDialog from "./PhotoDialog";
import { useState } from "react";
export function CardMenu() {
  const [image, setImage] = useState("");
  return (
    <Card className="w-[50vw] h-[30vh]">
      <CardContent className="w-full h-full ">
        <div className="w-full flex ">
          <div className="image w-full">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={`${image ? image : "https://github.com/shadcn.png"}`}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <PhotoDialog setImage={setImage} />
        </div>
      </CardContent>
    </Card>
  );
}
