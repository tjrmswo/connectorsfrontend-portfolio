import { Button, Input } from "@/shared";
import { CalendarIcon } from "lucide-react";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "@/shared/ui/drawer";
import Picker from "react-mobile-picker";
import { DialogTitle } from "@radix-ui/react-dialog";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";
import { ProfileFormData } from "../model/profileSchema";
import useProfileBirthDay from "../model/useProfileBirthDay";

const UserDatePicker = React.memo(
  ({
    register,
    getValues,
  }: {
    register: UseFormRegister<ProfileFormData>;
    getValues: UseFormGetValues<ProfileFormData>;
  }) => {
    const {
      registerProps,
      inputRef,
      handleDrawerOpen,
      pickerValue,
      years,
      ref,
      openDrawer,
      open,
      handlePickerChange,
      handleConfirm,
      days,
      months,
    } = useProfileBirthDay({ register, getValues });

    return (
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-row items-center font-[Pretendard] leading-[12px]">
          <span className="mr-1 text-sm font-semibold text-[#000]">
            생년월일
          </span>
        </div>
        <div className="relative flex">
          <Input
            {...register("birthDay")}
            className={`w-full rounded-sm border border-[#E0E0E0] font-[Pretendard] font-normal leading-[12px] transition-colors placeholder:text-[#BDBDBD] focus:border-[#6E4DDC]`}
            placeholder="YYYY.MM.DD"
          />
          <Button
            id="date-picker"
            variant="ghost"
            className="absolute right-1 top-1/2 size-6 -translate-y-1/2"
            onClick={openDrawer}
          >
            <CalendarIcon className="size-3.5" />
          </Button>

          {/* hidden input for react-hook-form */}
          <input
            type="hidden"
            {...registerProps}
            ref={(e) => {
              ref(e);
              inputRef.current = e;
            }}
          />

          <Drawer open={open} onOpenChange={handleDrawerOpen}>
            <DialogTitle></DialogTitle>
            <DrawerContent className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md rounded-t-[10px] sm:max-w-lg">
              <div className="p-4 [&>*]:touch-pan-y">
                <Picker
                  value={pickerValue}
                  onChange={handlePickerChange}
                  wheelMode="natural"
                  height={216}
                >
                  <Picker.Column name="year">
                    {years.map((year) => (
                      <Picker.Item key={year} value={year}>
                        {({ selected }) => (
                          <div
                            className={`py-2 text-center font-[Pretendard] text-base ${
                              selected
                                ? "font-semibold text-[#000]"
                                : "text-[#BDBDBD]"
                            }`}
                          >
                            {year}년
                          </div>
                        )}
                      </Picker.Item>
                    ))}
                  </Picker.Column>

                  <Picker.Column name="month">
                    {months.map((month) => (
                      <Picker.Item key={month} value={month}>
                        {({ selected }) => (
                          <div
                            className={`py-2 text-center font-[Pretendard] text-base ${
                              selected
                                ? "font-semibold text-[#000]"
                                : "text-[#BDBDBD]"
                            }`}
                          >
                            {month}월
                          </div>
                        )}
                      </Picker.Item>
                    ))}
                  </Picker.Column>

                  <Picker.Column name="day">
                    {days.map((day) => (
                      <Picker.Item key={day} value={day}>
                        {({ selected }) => (
                          <div
                            className={`py-2 text-center font-[Pretendard] text-base ${
                              selected
                                ? "font-semibold text-[#000]"
                                : "text-[#BDBDBD]"
                            }`}
                          >
                            {day}일
                          </div>
                        )}
                      </Picker.Item>
                    ))}
                  </Picker.Column>
                </Picker>
              </div>

              <DrawerFooter className="flex w-full flex-row justify-center gap-3">
                <Button
                  onClick={handleConfirm}
                  className="hover: w-1/5 border bg-[#6E4DDC] font-[Pretendard] font-semibold text-[#fff] hover:text-[#6E4DDC]"
                >
                  확인
                </Button>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    className="w-1/5 border border-[#e0e0e0] font-[Pretendard] font-semibold"
                  >
                    취소
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    );
  },
);
UserDatePicker.displayName = "UserDatePicker";
export default UserDatePicker;
