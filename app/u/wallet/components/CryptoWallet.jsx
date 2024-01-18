import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CryptoWallet() {
  return (
    <Card className="w-full bg-sky-500">
      <CardHeader>
        <CardTitle>
          <div className="w-full flex flex-col-reverse sm:flex-row gap-2 justify-between sm:items-center items-start">
            <h1 className="text-xl font-bold text-white">CRYPTO WALLET</h1>
            <p className="text-white">
              <img
                src="/pngwing.png"
                className="w-8 h-8 mr-1 invert inline-block"
                alt="coin"
              />
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-white">
        <div className="w-full justify-center items-start flex flex-col ">
          <h1 className="text-xs font-semibold uppercase">balance</h1>
          <p className="text-xl font-black ">0 ETH</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 justify-between">
        <Button variant="outline">Deposit</Button>
        <Button variant="outline">Transfer</Button>
        <Button>Withdraw</Button>
      </CardFooter>
    </Card>
  );
}
