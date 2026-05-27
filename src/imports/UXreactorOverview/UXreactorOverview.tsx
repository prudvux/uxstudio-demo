import imgSlide21 from "./cd2aba293d1d5011e3b99b3cb9cc346e338a0f3f.png";
import imgSlide31 from "./18d74b5083b3fff5c6d9a48fd239979f8f9277e0.png";
import imgSlide52 from "./13aaf3890faf37e14ebb9527cf05c431cbf75551.png";
import imgSlide42 from "./4f9fb0797a349d64828f6a7fdacfb9d2383e3889.png";
import imgSlide61 from "./8df42e00976a4e6cece6173db682ca573d24dfe7.png";
import imgSlide71 from "./2c930568dbb1728014d88169985c7b3fddb5a80a.png";
import imgSlide81 from "./dfc9fa045dd5cc827a9a398cb0b684dbea0440d3.png";
import imgSlide101 from "./456613151ea08733aed0b812c5d3f50836adeee1.png";
import imgSlide111 from "./93f5a8094a12df639ac0bb46ba94dbd5ac7338e1.png";
import imgSlide121 from "../image.png";
import imgSlide131 from "../image-1.png";
import imgSlide141 from "../image-2.png";

function FrameSlides() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative size-full">
      <div className="aspect-[1280/720] flex-[1_0_0] min-w-px relative" data-name="Slide6 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSlide61} />
      </div>
      <div className="aspect-[1280/720] flex-[1_0_0] min-w-px relative" data-name="Slide7 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSlide71} />
      </div>
    </div>
  );
}

function Define() {
  return <button className="block h-[60px] relative shrink-0 w-[223px]" data-name="Define" />;
}

function Design() {
  return <button className="block h-[60px] relative shrink-0 w-[224px]" data-name="Design" />;
}

function Develop() {
  return <button className="block h-[60px] relative shrink-0 w-[223px]" data-name="Develop" />;
}

function Deploy() {
  return <button className="block h-[60px] relative shrink-0 w-[223px]" data-name="Deploy" />;
}

function Discover() {
  return <button className="block h-[60px] relative shrink-0 w-[212px]" data-name="Discover" />;
}

function Frame1() {
  return (
    <div className="absolute content-stretch cursor-pointer flex items-start left-[150px] top-[83px] w-[1108px]">
      <Define />
      <Design />
      <Develop />
      <Deploy />
      <Discover />
    </div>
  );
}

function Define1() {
  return <div className="h-[60px] relative shrink-0 w-[223px]" data-name="Define" />;
}

function Design1() {
  return <button className="block cursor-pointer h-[60px] relative shrink-0 w-[224px]" data-name="Design" />;
}

function Develop1() {
  return <button className="block cursor-pointer h-[60px] relative shrink-0 w-[223px]" data-name="Develop" />;
}

function Deploy1() {
  return <button className="block cursor-pointer h-[60px] relative shrink-0 w-[223px]" data-name="Deploy" />;
}

function Discover1() {
  return <div className="h-[60px] relative shrink-0 w-[212px]" data-name="Discover" />;
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex items-start left-[150px] top-[100px] w-[1108px]">
      <Define1 />
      <Design1 />
      <Develop1 />
      <Deploy1 />
      <Discover1 />
    </div>
  );
}

export default function UXreactorOverview() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative size-full" data-name="UXreactor Overview">
      <div className="aspect-[1280/328] relative shrink-0 w-full" data-name="Slide2 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[219.51%] left-0 max-w-none top-[-62.8%] w-full" src={imgSlide21} />
        </div>
      </div>
      <div className="aspect-[1280/720] relative shrink-0 w-full" data-name="Slide3 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSlide31} />
      </div>
      <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full">
        <div className="aspect-[1280/720] flex-[1_0_0] min-w-px relative" data-name="Slide5 2">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSlide52} />
        </div>
        <div className="aspect-[1280/720] flex-[1_0_0] min-w-px relative" data-name="Slide4 2">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSlide42} />
        </div>
      </div>
      <FrameSlides />
      <div className="aspect-[1280/720] relative shrink-0 w-full" data-name="Slide8 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSlide81} />
      </div>
      <div className="h-[720px] relative shrink-0 w-[1280px]" data-name="Component 2/Deploy">
        <div className="absolute h-[720px] left-0 top-0 w-[1280px]" data-name="Slide10 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSlide101} />
        </div>
        <Frame1 />
      </div>
      <div className="h-[720px] relative shrink-0 w-[1280px]" data-name="Component 2">
        <div className="absolute h-[720px] left-0 top-0 w-[1280px]" data-name="Slide11 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSlide111} />
        </div>
        <Frame2 />
      </div>
      <div className="h-[720px] relative shrink-0 w-[1280px]" data-name="Slide12 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSlide121} />
      </div>
      <div className="h-[720px] relative shrink-0 w-[1280px]" data-name="Slide13 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSlide131} />
      </div>
      <div className="h-[720px] relative shrink-0 w-[1280px]" data-name="Slide14 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSlide141} />
      </div>
    </div>
  );
}
