class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]

  # PUT /resource
  def update

    resource_updated = update_resource(resource, account_update_params)
    yield resource if block_given?
    if resource_updated
      # set_flash_message_for_update(resource)
      redirect_to trips_path, notice: "個人資料更新成功!"
    else
      render :edit
    end
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute, :name])
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:attribute, :name, :image, :avatar, :remove_avatar])
  end

  def update_resource(resource, params)
    # Require current password if user is trying to change password.
    return super if params["password"]&.present?

    # Allows user to update registration information without password.
    resource.update_without_password(params.except("current_password"))
  end

  # The path used after sign up.
  def after_sign_up_path_for(resource)
    # super(resource)
    trips_path
  end

end
