import { ErrorMessage } from "@hookform/error-message";
import type { PhoneInputProps } from "react-phone-input-2";
import { Control, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
// import { startsWith } from "lodash";
import { cn } from "@/lib/utils";

// isTouched && !!error && inputStyles.error

const inputStyles = {
	base: "block peer !w-full focus:outline-none transition duration-200 disabled:!bg-gray-100 disabled:!text-gray-500 disabled:placeholder:!text-gray-400 disabled:!cursor-not-allowed disabled:!border-gray-200",
	error: "ring-[0.5px] ring-red-400 !border-red-500 hover:enabled:!border-red-500 focus:enabled:!border-red focus:!ring-red",
	size: {
		sm: "py-1 !text-xs !h-8 !leading-[32px]",
		md: "py-2 !text-sm !h-10 !leading-[40px]",
		lg: "py-2 !text-base !h-12 !leading-[48px]",
		xl: "py-2.5 !text-base !h-14 !leading-[56px]",
	},
	rounded: {
		none: "!rounded-none",
		sm: "!rounded-sm",
		md: "!rounded-md",
		lg: "!rounded-lg",
		pill: "!rounded-full",
	},
	variant: {
		flat: "!border-0 focus:ring-2 placeholder:!opacity-90 read-only:focus:!ring-0 !bg-primary-lighter/70 hover:enabled:!bg-primary-lighter/90 focus:!ring-primary/30 !text-primary-dark",
		outline:
			"!bg-transparent focus:ring-[0.6px] !border !border-gray-300 read-only:!border-muted read-only:focus:!ring-0 placeholder:!text-gray-500 hover:!border-green-400 focus:!border-green-400 focus:!ring-green-400",
		text: "!border-0 focus:ring-2 !bg-transparent hover:!text-primary-dark focus:!ring-primary/30 !text-primary",
	},
};

const buttonStyles = {
	base: "!border-0 !bg-transparent !static [&>.selected-flag]:!absolute [&>.selected-flag]:!top-[1px] [&>.selected-flag]:!bottom-[1px] [&>.selected-flag]:!left-[1px] [&>.selected-flag.open]:!bg-transparent [&>.selected-flag:hover]:!bg-transparent [&>.selected-flag:focus]:!bg-transparent",
	size: {
		sm: "[&>.selected-flag]:!h-[30px]",
		md: "[&>.selected-flag]:!h-[38px]",
		lg: "[&>.selected-flag]:!h-[46px]",
		xl: "[&>.selected-flag]:!h-[54px]",
	},
};

const dropdownStyles = {
	base: "!shadow-xl !text-sm !max-h-[216px] !w-full !my-1.5 !bg-gray-50 [&>.no-entries-message]:!text-center [&>.divider]:!border-muted",
	rounded: {
		none: "!rounded-sm",
		sm: "!rounded",
		md: "!rounded-md",
		lg: "!rounded-lg",
		pill: "!rounded-xl",
	},
	searchBox:
		"!pr-2.5 !bg-gray-50 [&>.search-box]:!w-full [&>.search-box]:!m-0 [&>.search-box]:!px-3 [&>.search-box]:!py-1 [&>.search-box]:!text-sm [&>.search-box]:!capitalize [&>.search-box]:!h-9 [&>.search-box]:!leading-[36px] [&>.search-box]:!rounded-md [&>.search-box]:!bg-transparent [&>.search-box]:!border-muted [&>.search-box:focus]:!border-gray-400/70 [&>.search-box:focus]:!ring-0 [&>.search-box]:placeholder:!text-gray-500",
	highlightListColor:
		"[&>li.country.highlight]:!bg-primary-lighter/70 [&>li.country:hover]:!bg-primary-lighter/70",
};

interface IPhoneInputField
	extends Omit<
		PhoneInputProps,
		| "inputClass"
		| "buttonClass"
		| "containerClass"
		| "dropdownClass"
		| "searchClass"
		| "enableSearch"
		| "disableSearchIcon"
	> {
	name: string;
	label: string;
	control: Control<any>;
	size?: keyof typeof buttonStyles.size;
	rounded?: keyof typeof inputStyles.rounded;
	variant?: keyof typeof inputStyles.variant;
	buttonClassName?: string;
	inputClassName?: string;
	dropdownClassName?: string;
}

/**
 *
 * https://www.npmjs.com/package/react-phone-input-2
 *
 */
export default function PhoneInputField({
	name,
	control,
	label,
	size = "md",
	rounded = "md",
	variant = "outline",
	buttonClassName,
	inputClassName,
	dropdownClassName,
	...props
}: IPhoneInputField) {
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onChange, value },
				formState: { errors },
				fieldState: { isTouched, error },
			}) => {
				// console.log(errors)
				return (
					<div className="flex-col space-y-1">
						{label && (
							<label htmlFor={name} className="">
								{label}
							</label>
						)}
						<PhoneInput
							country="ng"
							value={value}
							onChange={(phone) => onChange(phone)}
							// isValid={(inputNumber, country, countries) => {
							//   console.log({inputNumber, country, countries})
							//   return countries.some((country) => {
							//     return (
							//       startsWith(inputNumber, country.dialCode) ||
							//       startsWith(country.dialCode, inputNumber)
							//     );
							//   });
							// }}
							isValid={false}
							inputClass={cn(
								inputStyles.base,
								inputStyles.size[size],
								inputStyles.rounded[rounded],
								inputStyles.variant[variant],
								inputClassName,
								!!error && inputStyles.error,
								isTouched && !!error && inputStyles.error
							)}
							buttonClass={cn(
								buttonStyles.base,
								buttonStyles.size[size],
								// @ts-expect-error it flags disabled
								props.inputProps?.disabled && "pointer-events-none",
								// @ts-expect-error it flags read only
								props.inputProps?.readOnly && "pointer-events-none",
								buttonClassName
							)}
							dropdownClass={cn(
								dropdownStyles.base,
								dropdownStyles.rounded[rounded],
								dropdownStyles.highlightListColor,
								dropdownClassName
							)}
							preserveOrder={["preferredCountries"]}
							preferredCountries={["ng", "us", "gb", "ca"]}
							// onlyCountries={['ng','us','gb']}
							// containerClass={cn(!!error && inputStyles.error)}
							// inputProps={{
							//   className: "pl-10 placeholder:text-sm placeholder:text-gray-400",
							//   autoFocus: false,
							//   ...props.inputProps,
							// }}
							countryCodeEditable={false}
							{...props}
						/>
						<ErrorMessage
							errors={errors}
							name={name}
							render={({ message }) => (
								<p className="mt-1 text-sm text-red-500">{message}</p>
							)}
						/>
					</div>
				);
			}}
		/>
	);
}

PhoneInputField.displayName = "PhoneNumber";
