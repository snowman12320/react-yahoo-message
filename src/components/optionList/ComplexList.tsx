import { Loader2 } from '@/components/';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function ComplexList() {
  return (
    <Accordion
      type="single"
      collapsible
      className="yahoo-btn-cls"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>好友列表（0）</AccordionTrigger>
        <AccordionContent>
          <section className="flex gap-6 py-3 justify-between flex-1 px-3">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/social-e030c.appspot.com/o/about%2FIMG_5026.jpg?alt=media&token=126ed273-0959-44d8-879e-8647c06d335c"
              alt="user avatar"
              className="w-14 h-14 bg-slate-400 object-cover "
            />

            <div className="flex flex-col gap-3 justify-start w-full">
              <div className="flex items-center gap-3 justify-start flex-1">
                <span className="inline-block size-4 rounded-full bg-black " />
                <p>123</p>
              </div>

              <div className="flex gap-3 justify-between items-center">
                <Loader2 className="mr-2 size-5 animate-spin" />
              </div>
            </div>
          </section>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>邀約列表（0）</AccordionTrigger>
        <AccordionContent>
          <section className="flex gap-6 py-3 justify-between flex-1 px-3">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/social-e030c.appspot.com/o/about%2FIMG_5026.jpg?alt=media&token=126ed273-0959-44d8-879e-8647c06d335c"
              alt="user avatar"
              className="w-14 h-14 bg-slate-400 object-cover "
            />

            <div className="flex flex-col gap-3 justify-start w-full">
              <div className="flex items-center gap-3 justify-start flex-1">
                <span className="inline-block size-4 rounded-full bg-black " />
                <p>好友名稱</p>
              </div>

              <div className="flex gap-3 justify-between items-center">
                <p className="waiting-invite">等待對方接受邀請</p>
              </div>
            </div>
          </section>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
