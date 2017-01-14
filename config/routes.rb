Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  devise_for :users

  root to: 'home#index'

  resources :games, only: [:show] do
    member do
      post :finish
      post :abort
    end

    collection do
      post :play_now
      post :invite
    end
  end

  resources :user_game, only: [:update]
end
